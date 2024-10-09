 var initialFieldsCount = 6;
    var currentFieldsCount = 1;  

    $(document).ready(function () {
        loadInitialTaskFields();
    });


    function loadInitialTaskFields() {
        const container = $('#taskFieldsContainer');
        container.empty();
        for (let i = 0; i < initialFieldsCount / 3; i++) {
            appendTaskRow(container, i === 0); 
        }
    }


    function appendTaskRow(container, isFirstRow) {
        container.append(`
            <div class="form-group-row">
                <div class="form-group">
                    <label for="task${currentFieldsCount}">Task Type ${currentFieldsCount} ${isFirstRow ? '<span class="required">*</span>' : ''}</label>
                    <input type="text" id="task${currentFieldsCount}" name="task${currentFieldsCount}" ${isFirstRow ? 'required' : ''} placeholder="Create Task">
                    <span id="task${currentFieldsCount}Error" class="error"></span>
                </div>
                <div class="form-group">
                    <label for="task${currentFieldsCount + 1}">Task Type ${currentFieldsCount + 1}</label>
                    <input type="text" id="task${currentFieldsCount + 1}" name="task${currentFieldsCount + 1}" placeholder="Create Task">
                </div>
                <div class="form-group">
                    <label for="task${currentFieldsCount + 2}">Task Type ${currentFieldsCount + 2}</label>
                    <input type="text" id="task${currentFieldsCount + 2}" name="task${currentFieldsCount + 2}" placeholder="Create Task">
                </div>
            </div>
        `);
        currentFieldsCount += 3; 
    }


    function addTaskFields() {
        const container = $('#taskFieldsContainer');
        appendTaskRow(container, false);
    }

    

    
     function resetFieldCount(){
		 initialFieldsCount = 6; 
     currentFieldsCount = 1;
	}
