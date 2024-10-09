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
        .client-details {
            font-family: Arial, sans-serif;
            background-color: #f8f9fc;
            margin: 0;
            padding: 0;
        }

        .client-details-container {
            width: 100%;
            max-width: 95%;
            margin:  auto;
            background: #fff;
            padding: 20px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            background-color: #f3f4f6;
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

        
    </style>
</head>
<body class="client-details">

    <div class="client-details-container">
    <h4>Client Profile</h4><br>
        <form class="client-profile-form" id="addCompanyPageForm">
            <input type="hidden" id="status" name="status" value="${portalClientDtls.status != null ? portalClientDtls.status : true}">
			
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
                    <input type="email" id="email" name="email" placeholder="Email Address" value="${portalClientDtls.email}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="mobile">Mobile <span class="required">*</span></label>
                    <input type="number" id="mobile" name="mobile" placeholder="Mobile" value="${portalClientDtls.mobile}" required>
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
                        <input type="radio" id="gstYes" name="includeGst" value="true" <c:if test="${portalClientDtls.includeGst == 'true'}">checked</c:if>>
                        <label for="gstYes">Yes</label>
                        <input type="radio" id="gstNo" name="includeGst" value="false" <c:if test="${portalClientDtls.includeGst == 'false'}">checked</c:if>>
                        <label for="gstNo">No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="gst">GST</label>
                    <input type="text" id="gst" name="gst" placeholder="GST No." value="${portalClientDtls.gst}">
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
                <div class="form-group">
                    <label for="country">Country</label>
                    <select id="country" name="country">
                        <option value="" <c:if test="${empty portalClientDtls.country}">selected</c:if>>Select Country</option>
					    <option value="India" <c:if test="${portalClientDtls.country == 'India'}">selected</c:if>>India</option>
					    <option value="Afghanistan" <c:if test="${portalClientDtls.country == 'Afghanistan'}">selected</c:if>>Afghanistan</option>
					    <option value="Albania" <c:if test="${portalClientDtls.country == 'Albania'}">selected</c:if>>Albania</option>
					    <option value="Australia" <c:if test="${portalClientDtls.country == 'Australia'}">selected</c:if>>Australia</option>
					    <option value="Nepal" <c:if test="${portalClientDtls.country == 'Nepal'}">selected</c:if>>Nepal</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="currency">Currency</label>
                    <select id="currency" name="currency">
                         <option value="" <c:if test="${empty portalClientDtls.currency}">selected</c:if>>Select Currency</option>
						    <option value="INR" <c:if test="${portalClientDtls.currency == 'INR'}">selected</c:if>>INR</option>
						    <option value="USD" <c:if test="${portalClientDtls.currency == 'USD'}">selected</c:if>>USD</option>
						    <option value="KWD" <c:if test="${portalClientDtls.currency == 'KWD'}">selected</c:if>>KWD</option>
                    </select>
                </div>
            </div>

            <!-- Button Group -->
            <div class="button-group">
		         <button type="submit" class="save-btn" onclick="companyUpdateClientDetails(${portalClientDtls.clientId},event)">Update</button>

            </div>
        </form>
    </div>

    <!-- Success Popup -->
    <div id="successPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closePopup()">&times;</span>
            <p id="successMessage"></p>
            <button class="ok-btn" onclick="closePopup()">OK</button>
        </div>
    </div>


</body>
</html>
