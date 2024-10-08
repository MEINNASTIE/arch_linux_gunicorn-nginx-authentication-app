import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { QRCodeSVG } from 'qrcode.react';

// Utility function to generate SHA-256 hash
const generateHashB64 = async (username, password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${username};${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return btoa(hashString); 
};

const AuthLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usersExist, setUsersExist] = useState(true);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('https://localhost/api/users/count');
        setUsersExist(response.data.payload.count > 0);
      } catch (error) {
        console.error('Error fetching user count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, { setErrors, setStatus }) => {
    try {
      const hashB64 = await generateHashB64(values.username, values.password);
      const response = await axios.post('https://localhost/login', { username: values.username, password: hashB64 });
      
      if (response.status === 200) {
        const { token } = response.data.payload;
        localStorage.setItem('token', token);
        setStatus({ success: true });
        navigate('/main');
      } else {
        setErrors({ submit: 'Failed to log in' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: error.response?.data?.message || 'Invalid username or password' });
    }
  };

  const handleInitAdmin = async (values, { setErrors, setStatus }) => {
    try {
      const hashB64 = await generateHashB64(values.username, values.password);
      const response = await axios.post(`https://localhost/api/user/initadmin?hash=${hashB64}`);

      if (response.status === 201) {
        const { token } = response.data.payload;
        localStorage.setItem('token', token);
        setStatus({ success: true });
        navigate('/main');
      } else {
        setErrors({ submit: 'Failed to initialize admin user' });
      }
    } catch (error) {
      console.error('Admin init error:', error);
      setErrors({ submit: error.response?.data?.message || 'Failed to initialize admin' });
    }
  };

  const Form = ({ isAdminInit }) => (
    <Formik
      initialValues={{
        username: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('Username is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={isAdminInit ? handleInitAdmin : handleLogin}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Typography variant="h4" align="center">
            {isAdminInit ? 'Admin Initialization' : 'User Login'}
          </Typography>
          <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type="text"
              value={values.username}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Username"
            />
            {touched.username && errors.username && (
              <FormHelperText error id="standard-weight-helper-text-username">
                {errors.username}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              {isAdminInit ? 'Initialize Admin' : 'Login'}
            </Button>
          </AnimateButton>
          {errors.submit && (
            <FormHelperText error>
              {errors.submit}
            </FormHelperText>
          )}
        </form>
      )}
    </Formik>
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      {usersExist ? (
        <Form isAdminInit={false} />
      ) : (
        <Form isAdminInit={true} />
      )}
    </Box>
  );
};

export default AuthLogin;
