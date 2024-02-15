import express from 'express' ; 
import teamController from './team.controller.js';
import { validateSchema , storeAdminId} from '../../providers/schemaValidator.js';
import { teamSchema , addTeamMember } from './team.validation.js';

const router = express.Router();

router.post('/add',validateSchema(teamSchema),storeAdminId,teamController.addTeam);
router.delete('/delete/:teamId',teamController.deleteTeam);
router.get('/view',teamController.displayAllTeam);
router.get('/member/:id',teamController.displayTeamMember);
router.post('/member/add',validateSchema(addTeamMember),teamController.addTeamMember);
router.delete('/member/:id',teamController.deleteTeamMember);

export default router ; 