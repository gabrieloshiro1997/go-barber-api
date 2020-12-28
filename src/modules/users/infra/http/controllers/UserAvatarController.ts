import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarSevice from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarSevice);

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
    }
}
