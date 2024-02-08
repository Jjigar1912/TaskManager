import express from 'express' ; 
import userRoutes from './user/user.routes.js' ;
import teamRoutes from './teams/team.routes.js' ;

// represent an instance of express.Router()
const router = express.Router() ; 

router.use('/user',userRoutes);
router.use('/team',teamRoutes);

// exporting router to use in other modules . 
export default router ;