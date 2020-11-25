import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarSevice from '../services/UpdateUserAvatarService';

import ensureAuthenticaded from '../midleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_ad: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json(userWithoutPassword);
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticaded,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatar = new UpdateUserAvatarSevice();

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename,
            });

            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                created_ad: user.created_at,
                updated_at: user.updated_at,
            };

            return response.json(userWithoutPassword);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
);

export default usersRouter;
