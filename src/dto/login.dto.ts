/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequestDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: halo@gmail.com
 *         password: inipassword
 */
export interface LoginDTO {
  email: string;
  password: string;
}