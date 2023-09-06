/**
 * @swagger
 * components:
 *   schemas:
 *     CommonResponseDTO:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *         message:
 *           type: string
 *         data:
 *           type: object
 */
export interface CommonResponseDTO {
  status: number;
  message: string;
  data: any;
  httpCode?: number;
}
