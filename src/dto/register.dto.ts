/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequestDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *       example:
 *         email: halo@gmail.com
 *         password: inipassword
 *         name: John Doe
 */
export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
}