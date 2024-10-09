<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   <%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet"type="text/css"  href="/assets/css/loginStyle.css">
<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
</head>
<body>

<br>
<br>
    <div class="cont">
     <form action="/login" method="post">
        <div class="form sign-in"> 
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            <h2>Login</h2>
            	<c:if test="${param.error == 'true'}">
				    <p class="login-page-message">Invalid User name or password.</p>
				</c:if>
				
				<c:if test="${param.logout == 'true'}">
				    <p class="login-page-message">You have been logged out successfully.</p>
				</c:if>
				<c:if test="${param.sessionExpired == 'true'}">
				    <p class="login-page-message">Your session has expired. Please log in again.</p>
				</c:if>
				<label>
                <span>Email</span>
                <input type="text" name="username" required/>
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password" required/>
            </label>
            <!-- <p class="forgot-pass">Forgot password?</p> -->
           
            <button type="submit" class="submit">Sign In</button>
         
        </div>
        </form>
        <div class="sub-cont">
            <div class="img">
                <div class="img__text m--up">
                    <h3>Welcome to the Optimizer portal. Please Login<h3>
                </div>
            </div>
        </div>
    </div>
</body>
</html>