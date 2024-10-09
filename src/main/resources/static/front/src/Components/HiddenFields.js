import React, { useState } from 'react';
import "../../../public/assets/css/hidden-fields.css";
import AccessTypeList from '../../../public/assets/js/admin-access-type-list-script.js';

const HiddenFields = () => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  return (
    <div>
      <input type="hidden" name="companyIdForDetailsPage" id="companyIdForDetailsPage" />
      <input type="hidden" name="clientToDeactivate" id="clientToDeactivate" />
      <input type="hidden" name="clientToDelete" id="clientToDelete" />
      <input type="hidden" name="projectToDelete" id="projectToDelete" />
      <input type="hidden" name="memberToDeactivate" id="memberToDeactivate" />
      <input type="hidden" name="memberToDelete" id="memberToDelete" />
      <input type="hidden" name="taskWiseRoleToDelete" id="taskWiseRoleToDelete" />
      <input type="hidden" name="taskToDelete" id="taskToDelete" />
      <input type="hidden" name="teamMemberUpdateFlag" id="teamMemberUpdateFlag" />

      {loaderVisible && <div id="loader" className="loader"></div>}
    </div>
  );
};

export default HiddenFields;
