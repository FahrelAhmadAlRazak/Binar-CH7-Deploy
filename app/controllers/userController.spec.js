const UserController = require('./userController');
const userService = require('./../services/user');


jest.mock('../services/user.js', () => ({
    createUserAdmin: jest.fn(),
    createUser: jest.fn(),
    loginUser: jest.fn(),
}));

describe('UserController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('#createAdmin', () => {
        it('should create an admin user and return success', async () => {
            const req = {
                body: {
                    name: "fahrel admin",
                    email: "fahreladmin@gmail.com",
                    password: "fahreladmin123",
                    phoneNumber: "081234543234",
                    address: "Jl. Karimata"
                }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };


            userService.createUserAdmin.mockResolvedValue('mockedUserData');

            console.log('Before createAdmin');
            try {
                await UserController.createAdmin(req, res);
            } catch (error) {
                console.error('Error during createAdmin:', error);
            } finally {
                console.log('After createAdmin');
            }

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                message: 'Success',
                data: 'mockedUserData',
            });
        });

        it('should handle errors during admin user creation', async () => {
            const errorMessage = "An error occurred";
            const error = new Error(errorMessage);
            const req = {
                body: {
                    name: "fahrel admin",
                    email: "fahreladmin@gmail.com",
                    password: "fahreladmin123",
                    phoneNumber: "081234543234",
                    address: "Jl. Karimata"
                }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };


            userService.createUserAdmin.mockRejectedValue({ statusCode: 500, message: 'Internal Server Error' });

            await UserController.createAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 'FAIL',
                message: error,
            });
        });
    });

    describe('#create', () => {
        it('should create a user and return success', async () => {


            const req = {
                body: {
                    name: "fahrel member",
                    email: "fahrelmember@gmail.com",
                    password: "fahreladmin123",
                    phoneNumber: "081234543234",
                    address: "Jl. Karimata"
                }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

           
            userService.createUser.mockResolvedValue('mockedUserData');

            await UserController.create(req, res);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                message: 'Success',
                data: 'mockedUserData',
            });
        });

        it('should handle errors during user creation', async () => {
            const req = {
                body: {
                    name: "fahrel member",
                    email: "fahrelmember@gmail.com",
                    password: "fahreladmin123",
                    phoneNumber: "081234543234",
                    address: "Jl. Karimata"
                }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

         
            userService.createUser.mockRejectedValue({ statusCode: 400, message: 'Bad Request' });

            await UserController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 'FAIL',
                message: 'Bad Request',
            });
        });
    });

    describe('#login', () => {
        it('should login a user and return success', async () => {
            const req = { body: { 
                email: "fahreladmin@gmail.com",
                password: "fahreladmin123"
            } };
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

          
            userService.loginUser.mockResolvedValue('mockedUserData');

            await UserController.login(req, res);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                message: 'Success',
                data: 'mockedUserData',
            });
        });

        it('should handle errors during user login', async () => {
            const req = { body: { 
                email: "fahreladmin@gmail.com",
                password: "fahreladmin123"
            } };
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

           
            userService.loginUser.mockRejectedValue({ statusCode: 401, message: 'Unauthorized' });

            await UserController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                status: 'FAIL',
                message: 'Unauthorized',
            });
        });
    });
});
