<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   <%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Client</title>
    <style>
        /* General Styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fc;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 90%;
            margin: 50px auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
        }

        .client-list-btn-container {
            display: flex;
            justify-content: space-between;
            margin: 20px;
        }

        .client-list-btn {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: auto;
        }

        .client-list-btn:hover {
            background-color: #45a049;
        }

        .client-profile-form .form-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }

        .client-profile-form .form-group {
            flex: 1;
            margin-right: 10px;
        }

        .client-profile-form .form-group.full-width {
            flex: 2;
            margin-right: 0;
        }

        input[type="text"],
        input[type="email"],
        input[type="number"],
        select {
            width: 100%;
            padding: 8px;
            margin: 4px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        .button-group {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }

        .save-btn,
        .cancel-btn {
            background-color: #28a745;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
        }

        .save-btn:hover {
            background-color: #218838;
        }

        .cancel-btn {
            background-color: #ccc;
            color: #000;
        }

        .cancel-btn:hover {
            opacity: 0.8;
        }

        .radio-group {
            display: flex;
            align-items: center;
        }

        .radio-group input[type="radio"] {
            margin-right: 5px;
        }

       
        #successMessage {
            text-align: center;
            margin-bottom: 20px;
        }
        
        
        
        
        
        .required {
    		color: red;
    		font-weight: bold;
		}
		
		.error {
            color: red;
            font-size: 12px;
            display: none;
        }

.popup {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 60px;
}

.popup-content {
    background-color: #fff;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ok-btn {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
    display: inline-block;
    margin-top: 10px; /* Adds space between the button and the success message */
}

.close {
    color: #aaa;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
        
    </style>
</head>
<body>

    <div class="client-list-btn-container">
        <button class="client-list-btn" onclick="getClientListTable()">Client List</button>
    </div>

    <div class="container">
    <h4>${portalClientDtls.clientId > 0 ? 'Update Client' : 'Add Client'}</h4><br>
        <form class="client-profile-form" id="addCompanyPageForm">
            <div class="form-row">
                <div class="form-group">
                    <label for="companyName">Company Name <span class="required">*</span></label>
                    <input type="text" id="clientName" name="clientName" placeholder="Company Name" value="${portalClientDtls.clientName}" required>
                </div>
                <div class="form-group">
                    <label for="contactPerson">Contact Person <span class="required">*</span></label>
                    <input type="text" id="contactPerson" name="contactPerson" placeholder="Contact Person Name" value="${portalClientDtls.contactPerson}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="designation">Contact Person Designation <span class="required">*</span></label>
                    <input type="text" id="designation" name="designation" placeholder="Designation" value="${portalClientDtls.designation}" required>
                </div>
                <div class="form-group">
                    <label for="email">Primary Email <span class="required">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email Address" value="${portalClientDtls.email}" required onchange="isDuplicateClientEmail()">
                	<span id="emailError" class="error"></span>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="mobile">Mobile <span class="required">*</span></label>
                    <input type="number" id="mobile" name="mobile" placeholder="Mobile" onchange="mobileNumberValidation()" value="${portalClientDtls.mobile}" required>
                	<span id="mobileError" class="error">Mobile number must be between 10 and 12 digits long and contain only numbers.</span>
                </div>
                <div class="form-group">
                    <label for="website">Website</label>
                    <input type="text" id="website" name="website" value="${portalClientDtls.website}" placeholder="Website">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Include GST <span class="required">*</span></label>
                    <div class="radio-group">
                        <input type="radio" id="gstYes" name="includeGst" value="true" required onclick="toggleGSTField(true)" <c:if test="${portalClientDtls.includeGst == 'true'}">checked</c:if>>
                        <label for="gstYes">Yes</label>
                        <input type="radio" id="gstNo" name="includeGst" value="false"  required onclick="toggleGSTField(false)" <c:if test="${portalClientDtls.includeGst == 'false'}">checked</c:if>>
                        <label for="gstNo">No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="gst">GST</label>
                    <input type="text" id="gst" name="gst" placeholder="GST No." value="${portalClientDtls.gst}" <c:if test="${portalClientDtls.includeGst == 'false'}">disabled</c:if>>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="address">Address <span class="required">*</span></label>
                    <input type="text" id="address" name="address" placeholder="Complete Address" value="${portalClientDtls.address}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="state">State</label>
                    <input type="text" id="state" name="state" value="${portalClientDtls.state}" placeholder="State">
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" id="city" name="city" value="${portalClientDtls.city}" placeholder="City">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="zipCode">Zip Code</label>
                    <input type="number" id="zipCode" name="zipCode" value="${portalClientDtls.zipCode}" placeholder="Zip Code">
                </div>
                <input type="hidden" id="selectedCountry" value="${portalClientDtls.country}">
                <div class="form-group">
                    <label for="country">Country</label>
                    <select id="country" name="country">
                        <option value="-1">Select Country</option>
					    
                    </select>
                </div>
            </div>
            <input type="hidden" id="selectedCurrency" value="${portalClientDtls.currency}">
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="currency">Currency</label>
                    <select id="currency" name="currency">
                    	<option value="-1">Select Currency</option>
                    </select>
                </div>
            </div>

            <!-- Button Group -->
            <div class="button-group">
                <button type="button" class="cancel-btn" onclick="getClientListTable()">Cancel</button>
                <c:choose>
		            <c:when test="${portalClientDtls.clientId > 0}">
		                <button type="submit" class="save-btn" onclick="companyUpdateClientDetails(${portalClientDtls.clientId},event)">Update</button>
		            </c:when>
		            <c:otherwise>
		                <button type="submit" class="save-btn" onclick="companySaveClientDetails(event)">Save</button>
		            </c:otherwise>
        		</c:choose>
                
            </div>
        </form>
    </div>

    <!-- Success Popup -->
    <div id="successPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closeSuccessPopup()">&times;</span>
            <p id="successMessage"></p>
            <button class="ok-btn" onclick="closeSuccessPopup()">OK</button>
        </div>
    </div>
    
    

<script src="../assets/js/admin-add-client-script.js"></script>
</body>
</html>
