/**
 * @swagger
 * components:
 *   schemas:
 *     CommonResponseDTO:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - data
 *       properties:
 *         status:
 *           type: number
 *         message:
 *           type: string
 *         data:
 *           type: object
 *   responses:
 *     CommonResponseSuccessDTO:
 *       description: Success response
 *       content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CommonResponseDTO"
 *     CommonResponseErrorDTO:
 *       description: Error response
 *       content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CommonResponseDTO"
 */
export interface CommonResponseDTO {
  status: number;
  message: string;
  data: any;
  httpCode?: number;
}
