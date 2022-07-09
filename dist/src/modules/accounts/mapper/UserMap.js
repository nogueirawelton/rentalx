"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
class UserMap {
    static toDTO({ email, name, id, avatar, driver_license, }) {
        const avatar_url = process.env.DISK === "s3Storage"
            ? `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`
            : `${process.env.APP_API_URL}/avatar/${avatar}`;
        return {
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url,
        };
    }
}
exports.UserMap = UserMap;
