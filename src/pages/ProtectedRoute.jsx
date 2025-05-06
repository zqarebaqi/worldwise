import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
   const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated) navigate('/')
    }, [isAuthenticated, navigate])
    
    return  isAuthenticated ? children : null;

}

export default ProtectedRoute;



// aval talash mikone return kone va mibine user error mide c
// va bad az render useffect ejra mishe 
// vas hamin miaym return ro sharti mikonim