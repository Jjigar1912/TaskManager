import express from 'express' ; 
import userRoutes from './user/user.routes.js' ;
import teamRoutes from './teams/team.routes.js' ;
import TaskRoutes from './task/task.routes.js';
import projectRoutes from './project/project.routes.js';

// represent an instance of express.Router()
const router = express.Router() ; 

router.use('/user',userRoutes);
router.use('/team',teamRoutes);
router.use('/project',projectRoutes);
router.use('/task',TaskRoutes);

// exporting router to use in other modules . 
export default router ;