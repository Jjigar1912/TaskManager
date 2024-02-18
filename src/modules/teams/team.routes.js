import express from 'express' ; 
import teamController from './team.controller.js';
import { validateSchema , storeAdminId, validateUser} from '../../providers/schemaValidator.js';
import { teamSchema , addTeamMember, updateTeam } from './team.validation.js';

const router = express.Router();

/**
    * @swagger
    *
    * /team/add:
    *   post:
    *     summary: Return a new team id
    *     tags:
    *       - Team
    *     produces:
    *       - application/json
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: team
    *         in: body
    *         schema:
    *           type: object
    *           properties:
    *             name:
    *               type: string
    *               required: true
    *             tl_id:
    *               type: string
    *               required: true
    *             user_id:
    *               type: array
    *               items: 
    *                   type: string
    *               required: true
    *     responses:  
    *       '201': 
    *         description: 'Created Team' 
    *         schema: 
    *           type: object 
    *           properties: 
    *             status: 
    *               type: integer
    *               required: true 
    *             message: 
    *               type: string
    *               required: true 
    *             data: 
    *               type: string 
    *               required: true
    *       '409':
    *         description: 'Conflict' 
    *         schema: 
    *           type: object 
    *           properties: 
    *             status: 
    *               type: integer
    *               required: true 
    *             message: 
    *               type: string
    *               required: true 
    *             data: 
    *               type: string 
    *               required: true
    *       '500':
    *         description: 'Internal Server Error'
    *         schema: 
    *           type: object 
    *           properties: 
    *             status: 
    *               type: integer
    *               required: true 
    *             message: 
    *               type: string
    *               required: true 
    *             data: 
    *               type: string 
    *               required: true
*/
router.post('/add',validateSchema(teamSchema),storeAdminId,teamController.addTeam);

/**
 * @swagger 
 * 
 * /team/delete/{id}:
 *    delete: 
 *      summary: Delete a team by id 
 *      parameters: 
 *       - in: path
 *         name: teamId 
 *         type: string 
 *         required: true
 *      tags: 
 *       - Team
 *      responses: 
 *       '200': 
 *         description: Deleted Team
 *         schema: 
 *           type: object
 *           properties: 
 *               status: 
 *                 type: integer 
 *                 required: true 
 *               message: 
 *                 type: string 
 *                 required: true 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object
 *           properties: 
 *               status: 
 *                 type: integer 
 *                 required: true 
 *               message: 
 *                 type: string 
 *                 required: true 
 */
router.delete('/delete/:teamId',teamController.deleteTeam);




/**
 * @swagger
 *
 * /team/update/{teamId}:
 *    put:
 *      summary: Update a team by id
 *      parameters:
 *        - in: path
 *          name: teamId
 *          type: string
 *          required: true
 *        - in: body
 *          name: teamDetails
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            tl_id:
 *              type: string
 *      tags:
 *        - Team
 *      responses:
 *        '200':
 *          description: Team Updated Successfully.
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                required: true
 *              message:
 *                type: string
 *                required: true
 *        '500':
 *          description: Internal Server Error
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                required: true
 *              message:
 *                type: string
 *                required: true
 *        '409':
 *          description: Conflict While Updating the team
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                required: true
 *              message:
 *                type: string
 *                required: true
 *           
 */
router.put('/update/:teamId',validateSchema(updateTeam),validateUser(['admin','tl']),teamController.updateTeam);
/**
 * @swagger 
 * /team/view: 
 *   get: 
 *     summary: Returns all teams 
 *     tags: 
 *       - Team
 *     responses: 
 *       '200': 
 *         description: Returns all teams
 *         schema: 
 *           type: array
 *           items:
 *             type: object  
 *             properties: 
 *               teamId: 
 *                 type: string 
 *                 required: true 
 *               teamName: 
 *                 type: string 
 *                 required: true 
 *               TL: 
 *                 type: string 
 *                 required: true 
 *               createdBy: 
 *                 type: string 
 *                 required: true 
 *               teamMemberCount: 
 *                  type: integer 
 *                  required: true 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object 
 *           properties: 
 *             status: 
 *               type: integer
 *               required: true 
 *             message: 
 *               type: string
 *               required: true 
 *             data: 
 *               type: string 
 *               required: true
 */
router.get('/view',teamController.displayAllTeam);



/**
 * @swagger 
 * /team/member/{teamId}: 
 *   get: 
 *     summary: Returns all members of specific team 
 *     tags: 
 *       - Team
 *     parameters: 
 *       - in: path
 *         name: teamId 
 *         type: string 
 *         required: true
 *     responses: 
 *       '200': 
 *         description: Returns all team member of specific team
 *         schema: 
 *           type: array
 *           items:
 *             type: object  
 *             properties: 
 *               id: 
 *                 type: string 
 *                 required: true 
 *               userName: 
 *                 type: string 
 *                 required: true 
 *               email: 
 *                 type: string 
 *                 required: true 
 *               contact: 
 *                 type: string 
 *                 required: true 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object 
 *           properties: 
 *             status: 
 *               type: integer
 *               required: true 
 *             message: 
 *               type: string
 *               required: true 
 *             data: 
 *               type: string 
 *               required: true
 */
router.get('/member/:teamId',teamController.displayTeamMember);

/**
    * @swagger
    *
    * /team/member/add:
    *   post:
    *     summary: Adds a new team member to specific team
    *     tags:
    *       - Team
    *     produces:
    *       - application/json
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: team
    *         in: body
    *         schema:
    *           type: object
    *           properties:
    *             team_id:
    *               type: string
    *               required: true
    *             users:
    *               type: array
    *               items: 
    *                   type: string 
    *               required: true
    *     responses:  
    *       '201': 
    *         description: 'Created Team Member' 
    *         schema: 
    *           type: object 
    *           properties: 
    *             status: 
    *               type: integer
    *               required: true 
    *             message: 
    *               type: string
    *               required: true 
    *             data: 
    *               type: string 
    *               required: true
    *       '409':
    *         description: 'Conflict' 
    *         schema: 
    *           type: object 
    *           properties: 
    *             status: 
    *               type: integer
    *               required: true 
    *             message: 
    *               type: string
    *               required: true 
    *             data: 
    *               type: string 
    *               required: true
    *       '500':
    *         description: 'Internal Server Error'
    *         schema: 
    *           type: object 
    *           properties: 
    *             status: 
    *               type: integer
    *               required: true 
    *             message: 
    *               type: string
    *               required: true 
    *             data: 
    *               type: string 
    *               required: true
*/
router.post('/member/add',validateSchema(addTeamMember),teamController.addTeamMember);




/**
 * @swagger 
 * 
 * /team/member/{memberId}:
 *    delete: 
 *      summary: Delete a team member by id 
 *      parameters: 
 *       - in: path
 *         name: memberId 
 *         type: string 
 *         required: true
 *      tags: 
 *       - Team
 *      responses: 
 *       '200': 
 *         description: Deleted Team Member
 *         schema: 
 *           type: object
 *           properties: 
 *               status: 
 *                 type: integer 
 *                 required: true 
 *               message: 
 *                 type: string 
 *                 required: true 
 *       '500':
 *         description: 'Internal Server Error'
 *         schema: 
 *           type: object
 *           properties: 
 *               status: 
 *                 type: integer 
 *                 required: true 
 *               message: 
 *                 type: string 
 *                 required: true 
 */
router.delete('/member/:memberId',teamController.deleteTeamMember);

export default router ; 