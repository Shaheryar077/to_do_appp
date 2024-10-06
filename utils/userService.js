const User = require('../model/user.model')
const jwt = require('jsonwebtoken')

class UserService{




    async registerUser({
        username,
        email,
        password

    }){
        try {
            const existingUser = await User.findOne({email})
          if(existingUser){
            return {
                status:400,
                success:false,
                message:'Email already exsist'
            }
          }  
          const user = new User({
            username,
            email,
            password

          });

          await user.save();

          return{
            status:201,
                success:true,
                data: user,
                message:'User registered successfully'
          }

        } catch (error) {
            console.error("error in registration",error)
            return{
                status:500,
                success:false,
                message:'Server error or registration failed'
            }
            
        }


    }

    async loginUser({
        email,
        password
    }) {
        try {
            const user = await User.findOne({
                email
            });
            if (!user) {
                return {
                    status: 404,
                    success: false,
                    message: 'User not found.'
                };
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return {
                    status: 401,
                    success: false,
                    message: 'Invalid credentials.'
                };
            }

            const token = jwt.sign({
                userId: user._id
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            return {
                status: 200,
                success: true,
                data: {
                    token,
                    user
                },
                message: 'Login successful.'
            };
        } catch (error) {
            console.error('Error in loginUser:', error);
            return {
                status: 500,
                success: false,
                message: 'Login failed.'
            };
        }
    }



    async logoutUser(token) {
        try {
            

            return {
                status: 200,
                success: true,
                message: 'Logout successful.'
            }; // 200 OK
        } catch (error) {
            console.error('Error in logoutUser:', error);
            return {
                status: 500,
                success: false,
                message: 'Logout failed.'
            }; // 500 Internal Server Error
        }
    }
   
    
}


module.exports = new UserService