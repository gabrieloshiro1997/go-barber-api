import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarSevice from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticaded from '../midleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

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
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticaded,
    upload.single('avatar'),
    async (request, response) => {
        const usersRepository = new UsersRepository();
        const updateUserAvatar = new UpdateUserAvatarSevice(usersRepository);

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
    },
);

export default usersRouter;
