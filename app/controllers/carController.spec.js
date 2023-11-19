const carController = require("./carController");
const carService = require("../services/car");

const cars = [{
    "id": "8eeb7944-83f6-40aa-a03d-5e85ccabf8dd",
    "image": "./images/car01.min.jpg",
    "capacity": 3,
    "rentperday": 400000,
    "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    "availableAt": "2022-03-23T15:49:05.563Z",
    "createdBy": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
    "updatedBy": null,
    "deletedBy": null,
    "createdAt": "2023-10-23T11:55:29.456Z",
    "updatedAt": "2023-10-23T11:55:29.456Z",
    "deletedAt": null,
    "created": {
        "id": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
        "name": "fahrel admin",
        "email": "fahreladmin@gmail.com",
        "encryptedPassword": "$2a$10$R1RQVl2nyCnnk4WmuS1Rxe8j2eht5EkhrQRkhnRVMnxB1b/B8e8XC",
        "phoneNumber": "081234543234",
        "address": "Jl. Karimata",
        "role": "ADMIN",
        "createdAt": "2023-10-22T15:58:28.629Z",
        "updatedAt": "2023-10-22T15:58:28.629Z"
    },
    "updated": null,
    "deleted": null

}]

const createCars = [{
    "id": "f4121a3d-33dd-4b2c-b5b4-93e7324e5e18",
    "image": "./images/car05.min.jpg",
    "capacity": 3,
    "rentperday": 400000,
    "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    "availableAt": "2022-03-23T15:49:05.563Z",
    "createdBy": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
    "updatedAt": "2023-11-17T18:23:43.747Z",
    "createdAt": "2023-11-17T18:23:43.747Z",
    "updatedBy": null,
    "deletedBy": null,
    "deletedAt": null
}]

const carDelete = [
    1,
    [
        1
    ]
]

const carUpdate = [
    1
];



jest.mock('./../services/car.js', () => ({
    listCar: jest.fn().mockReturnValue(cars),
    createCar: jest.fn().mockReturnValue(createCars),
    deleteById: jest.fn().mockReturnValue(carDelete),
    updateCarById: jest.fn().mockResolvedValue(carUpdate),
    getCarById: jest.fn()

}));




describe("carController", () => {
    describe("#list", () => {
        it("should return list of cars", async () => {
       
            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

           
            await carController.list(req, res);

          
            expect(carService.listCar).toHaveBeenCalled();

            expect(res.json).toHaveBeenCalledWith({
                status: "OK",
                message: "Success",
                data: cars,
            });
        });

        it("should handle error correctly", async () => {
         
            const errorMessage = "An error occurred";
            const error = new Error(errorMessage);
            error.statusCode = 500;

            carService.listCar.mockRejectedValueOnce(error);

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            // Execute
            await carController.list(req, res);

            // Verify
            expect(carService.listCar).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: "FAIL",
                message: errorMessage,
            });
        });
    });

    describe("#detail", () => {
        it("should return car details", () => {
          
            const carData = [{
                id: "8eeb7944-83f6-40aa-a03d-5e85ccabf8dd",
                image: "./images/car03.min.jpg",
                capacity: 3,
                rentperday: 400000,
                description: "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                availableAt: "2022-03-23T15:49:05.563Z",
                createdBy: "6e589449-db5b-4c77-8ada-bb8b62e210aa",
                updatedBy: null,
                deletedBy: null,
                createdAt: "2023-10-23T11:55:36.983Z",
                updatedAt: "2023-10-23T11:55:36.983Z",
                deletedAt: null,
                created: {
                    id: "6e589449-db5b-4c77-8ada-bb8b62e210aa",
                    name: "fahrel admin",
                    email: "fahreladmin@gmail.com",
                    encryptedPassword: "$2a$10$R1RQVl2nyCnnk4WmuS1Rxe8j2eht5EkhrQRkhnRVMnxB1b/B8e8XC",
                    phoneNumber: "081234543234",
                    address: "Jl. Karimata",
                    role: "ADMIN",
                    createdAt: "2023-10-22T15:58:28.629Z",
                    updatedAt: "2023-10-22T15:58:28.629Z"
                },
                updated: null,
                deleted: null
               
            }];

            const req = { car: carData };
            const res = {
                json: jest.fn(),
            };

  
            carController.detail(req, res);

        
            expect(res.json).toHaveBeenCalledWith({
                status: "OK",
                message: "Success",
                data: carData,
            });
        });
    });


    describe("#create", () => {
        it("should create a car and return success", async () => {
         
            const req = {
                body: {
                    "image": "./images/car05.min.jpg",
                    "capacity": 3,
                    "rentperday": 400000,
                    "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                    "availableAt": "2022-03-23T15:49:05.563Z"
                },
                user: {
                    id: "8eeb7944-83f6-40aa-a03d-5e85ccabf8dd",
                },
            };

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

          
            carService.createCar.mockResolvedValue([{
                "id": "f4121a3d-33dd-4b2c-b5b4-93e7324e5e18",
                "image": "./images/car05.min.jpg",
                "capacity": 3,
                "rentperday": 400000,
                "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                "availableAt": "2022-03-23T15:49:05.563Z",
                "createdBy": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
                "updatedAt": "2023-11-17T18:23:43.747Z",
                "createdAt": "2023-11-17T18:23:43.747Z",
                "updatedBy": null,
                "deletedBy": null,
                "deletedAt": null
            }]);

     
            await carController.create(req, res);

    
            expect(carService.createCar).toHaveBeenCalledWith(req.body, req.user.id);

            expect(res.json).toHaveBeenCalledWith({
                status: "OK",
                message: "Success",
                data:
                    [{
                        "id": "f4121a3d-33dd-4b2c-b5b4-93e7324e5e18",
                        "image": "./images/car05.min.jpg",
                        "capacity": 3,
                        "rentperday": 400000,
                        "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                        "availableAt": "2022-03-23T15:49:05.563Z",
                        "createdBy": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
                        "updatedAt": "2023-11-17T18:23:43.747Z",
                        "createdAt": "2023-11-17T18:23:43.747Z",
                        "updatedBy": null,
                        "deletedBy": null,
                        "deletedAt": null
                    }]
                ,
            });
        });

        it("should handle error correctly", async () => {
       
            const req = {
                body: {
                    "image": "./images/car05.min.jpg",
                    "capacity": 3,
                    "rentperday": 400000,
                    "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                    "availableAt": "2022-03-23T15:49:05.563Z"
                },
                user: {
                    id: "8eeb7944-83f6-40aa-a03d-5e85ccabf8dd",
                },
            };

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

           
            const error = new Error("Some error");
            error.statusCode = 500;
            carService.createCar.mockRejectedValueOnce(error);

        
            await carController.create(req, res);

          
            expect(carService.createCar).toHaveBeenCalledWith(req.body, req.user.id);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: "FAIL",
                message: "Some error",
            });
        });
    });

    describe('#destroy', () => {
        it('should delete a car and return success', async () => {
       
            const req = {
                params: {
                    id: 'f4121a3d-33dd-4b2c-b5b4-93e7324e5e18',
                },
                user: {
                    id: '6e589449-db5b-4c77-8ada-bb8b62e210aa',
                },
            };

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

      
            carService.deleteById.mockResolvedValue({
                "id": "777f368a-5c5f-401d-9f20-605bfcd87c73",
                "image": "./images/car02.min.jpg",
                "capacity": 3,
                "rentperday": 400000,
                "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                "availableAt": "2022-03-23T15:49:05.563Z",
                "createdBy": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
                "updatedBy": null,
                "deletedBy": null,
                "createdAt": "2023-10-23T11:55:33.146Z",
                "updatedAt": "2023-10-23T11:55:33.146Z",
                "deletedAt": null,
                "created": {
                    "id": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
                    "name": "fahrel admin",
                    "email": "fahreladmin@gmail.com",
                    "encryptedPassword": "$2a$10$R1RQVl2nyCnnk4WmuS1Rxe8j2eht5EkhrQRkhnRVMnxB1b/B8e8XC",
                    "phoneNumber": "081234543234",
                    "address": "Jl. Karimata",
                    "role": "ADMIN",
                    "createdAt": "2023-10-22T15:58:28.629Z",
                    "updatedAt": "2023-10-22T15:58:28.629Z"
                },
                "updated": null,
                "deleted": null
            });

          
            await carController.destroy(req, res);

          
            expect(carService.deleteById).toHaveBeenCalledWith(req.params.id, req.user.id);

            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                message: 'Success',
                data: {
                    "id": "777f368a-5c5f-401d-9f20-605bfcd87c73",
                    "image": "./images/car02.min.jpg",
                    "capacity": 3,
                    "rentperday": 400000,
                    "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                    "availableAt": "2022-03-23T15:49:05.563Z",
                    "createdBy": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
                    "updatedBy": null,
                    "deletedBy": null,
                    "createdAt": "2023-10-23T11:55:33.146Z",
                    "updatedAt": "2023-10-23T11:55:33.146Z",
                    "deletedAt": null,
                    "created": {
                        "id": "6e589449-db5b-4c77-8ada-bb8b62e210aa",
                        "name": "fahrel admin",
                        "email": "fahreladmin@gmail.com",
                        "encryptedPassword": "$2a$10$R1RQVl2nyCnnk4WmuS1Rxe8j2eht5EkhrQRkhnRVMnxB1b/B8e8XC",
                        "phoneNumber": "081234543234",
                        "address": "Jl. Karimata",
                        "role": "ADMIN",
                        "createdAt": "2023-10-22T15:58:28.629Z",
                        "updatedAt": "2023-10-22T15:58:28.629Z"
                    },
                    "updated": null,
                    "deleted": null
                }
            });
        });

        it('should handle error correctly', async () => {
           
            const req = {
                params: {
                    id: 'f4121a3d-33dd-4b2c-b5b4-93e7324e5e18',
                },
                user: {
                    id: '6e589449-db5b-4c77-8ada-bb8b62e210aa',
                },
            };

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

           
            const error = new Error('Some error');
            error.statusCode = 500;
            carService.deleteById.mockRejectedValueOnce(error);

           
            await carController.destroy(req, res);

         
            expect(carService.deleteById).toHaveBeenCalledWith(req.params.id, req.user.id);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 'FAIL',
                message: 'Some error',
            });
        });
    });

    describe('#update', () => {
        it('should update the car and return success message', async () => {
            
            carService.updateCarById.mockResolvedValue();
        
         
            const req = {
                body: {
                    "image": "./images/car08.min.jpg",
                    "capacity": 3,
                    "rentperday": 400000,
                    "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                    "availableAt": "2022-03-23T15:49:05.563Z"
                },
                params: { id: 'f4121a3d-33dd-4b2c-b5b4-93e7324e5e18' },
                user: { id: 'yourUserId' }
            };
            const res = {
                json: jest.fn(), // Do not pass carUpdate here
                status: jest.fn().mockReturnThis()
            };
        
            // Call the update function
            await carController.update(req, res); // Call your update function, not carService.updateCarById
        
            // Assertions
            expect(res.json).toHaveBeenCalledWith({
                data: [1],
                message: 'Success',
                status: 'OK',
            });
        
            // Optionally, you can also add assertions to check if the service function was called with the correct arguments
            expect(carService.updateCarById).toHaveBeenCalledWith('yourTestId', {
                "image": "./images/car08.min.jpg",
                "capacity": 3,
                "rentperday": 400000,
                "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                "availableAt": "2022-03-23T15:49:05.563Z", 'userId': 'yourUserId'
            });
        });
        

        it('should handle errors and return the correct status and message', async () => {
            // Mock the service function to throw an error
            carService.updateCarById.mockRejectedValue({ statusCode: 500, message: 'Your error message' });

            // Mock the request and response objects
            const req = {
                body: {
                    "image": "./images/car08.min.jpg",
                    "capacity": 3,
                    "rentperday": 400000,
                    "description": "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                    "availableAt": "2022-03-23T15:49:05.563Z"
                },
                params: { id: 'f4121a3d-33dd-4b2c-b5b4-93e7324e5e18' },
                user: { id: '6e589449-db5b-4c77-8ada-bb8b62e210aa' }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

          
            await carController.update(req, res);

           
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 'FAIL',
                message: 'Your error message',
              
            });
        });
    });

    describe('#findAndSetById Middleware', () => {
        it('should set car in request and call next', async () => {
     
          const mockCar = { id: 'f4121a3d-33dd-4b2c-b5b4-93e7324e5e18' };
          const req = { params: { id: 'f4121a3d-33dd-4b2c-b5b4-93e7324e5e18' } };
          const res = {};
          const next = jest.fn();
      
       
          carService.getCarById.mockResolvedValue(mockCar);
      
       
          await carController.findAndSetById(req, res, next);
      
        
          expect(carService.getCarById).toHaveBeenCalledWith('f4121a3d-33dd-4b2c-b5b4-93e7324e5e18');
          expect(req.car).toEqual(mockCar);
          expect(next).toHaveBeenCalled();
        });
      
        it('should handle errors and send JSON response', async () => {
     
          const error = new Error('Mock Error');
          error.statusCode = 404; 
          const req = { params: { id: 'nonExistentCarId' } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
          const next = jest.fn();
      
          
          carService.getCarById.mockRejectedValue(error);
      
         
          await carController.findAndSetById(req, res, next);
      
        
          expect(carService.getCarById).toHaveBeenCalledWith('nonExistentCarId');
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: 'Mock Error',
          });
          expect(next).not.toHaveBeenCalled(); 
        });
      });

});