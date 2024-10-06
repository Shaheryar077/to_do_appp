const UserService = require('../utils/userService')

const registerUser = async(req,res)=>{
    try {

        const user = await UserService.registerUser(req.body);
        res.status(201).json({
            success:true,
            data:user
        })
        
    } catch (error) {

        console.error('Error during resgistration',error.message)
        res.status(500).json({
            success:false,
            message:'resgistration failed',
            error:error.message
        })
        
    }
}

const loginUser = async(req,res)=>{
   try {
    const user = await UserService.loginUser({
        email:req.body.email,
        password:req.body.password
    });
    if(!user){
        res.status(400).json({
            success:false,
            message:'user not exsist'
        })


    }
    res.status(200).json({
        success:true,
        token : user.data.token,
        user:user.data.user
    })

    
   } catch (error) {
    console.error('Error during login',error)
    res.status(500).json({
        success:false,
        message : 'login failed',
        error:error.message
    })
    
   }

}

const logoutUser = async(req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({
                success: false,
                message: 'Token required for logout.'
            });
        }

       
        const token = authHeader.split(' ')[1];

        
        const result = await UserService.logoutUser(token);

        res.status(result.status).json({
            success: result.success,
            message: result.message
        });
    } catch (err) {
        console.error('Error during logout:', err.message);
        res.status(500).json({
            success: false,
            message: 'Logout failed.',
            error: err.message
        });
    }
};



module.exports = {registerUser,loginUser,logoutUser}