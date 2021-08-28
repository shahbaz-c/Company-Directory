$(window).on('load', function () {
	getAll();
});

// **************************************************************************

// Load all table Data
function getAll() {
	$.ajax({
		url: 'libs/php/getAll.php',
		type: 'POST',
		dataType: 'json',

		success: function (result) {
			for (var i = 0; i < result.length; i++) {
				$('#employeeProfiles').append(`
				<div class="col-lg-4" id="employeeData">
					<div class="card">
						<div class="profile-bg">
							<img src="" alt="" />
						</div>
						<div class="profile-img">
							<img
								class="employeePhoto"
								src="vendor/images/profileAvatar.png"
								alt="Employee Photo"
							/>
						</div>
						<div class="employee-info">
							<h2><span id="employeeLname">${result[i].lastName}</span>, <span id="employeeFname">${result[i].firstName}</span></h2>
							<div>
								<h4>Job Title: <span>${result[i].jobTitle}</span></h4>
							</div>
							<div>
								<h4>Email: <span>${result[i].email}</span></h4>
							</div>
							<div>
								<h4>Department: <span>${result[i].department}</span></h4>
							</div>
							<div>
								<h4>Location: <span>${result[i].location}</span></h4>
							</div>
						</div>
						<div class="d-flex justify-content-center mb-4">
							<button
								id="updateBtn"
								class="
									btn btn-success 
									m-3 
									rounded-pill 
									border-dark border-1
									edit-btn
								"
								data-bs-toggle="modal"
								data-bs-target="#updateEmployeeModal"
								name="id"
								onclick=populateEmployeeUpdate(${result[i].id})
							>
								<b>EDIT</b>
							</button>
							<button
								class="
									btn btn-danger
									m-3
									rounded-pill
									border-dark border-1
									del-btn
								"
								data-bs-toggle="modal"
								data-bs-target="#deleteEmployee"
								onclick=delEmployee(${result[i].id})
							>
								<b>DELETE</b>
							</button>
						</div>
					</div>
				</div>`);
			}
		},
	});
}

// **************************************************************************

// Populate Department and drop down lists
$.ajax({
	url: 'libs/php/getAllDepartments.php',
	type: 'POST',
	dataType: 'json',

	success: function (result) {
		for (i = 0; i < result.data.length; i++) {
			$('#employeeDept').append(`
		        <option value='${result.data[i].id}'>${result.data[i].name}</option>
		    `);
			$('#updateEmployeeDept').append(`
		        <option value='${result.data[i].id}'>${result.data[i].name}</option>
		    `);

			$('#departments').append(`
				<tr>
					<td id="deptName"><b>${result.data[i].name}</b> </td>
					<td>
						<button 
							type="button" 
							title="Edit" 
							class="btn btn-success btn-sm"  
							data-bs-toggle="modal"
							data-bs-target="#updateDepartmentModal"
							onclick=populateDeptUpdate(${result.data[i].id}) 
						>
							<i class="fas fa-edit"></i> 
						</button>
					</td>
					<td>
						<button 
							type="button" 
							title="Delete" 
							class="btn btn-danger btn-sm dept-del"
							data-bs-toggle="modal"
                            data-bs-target="#deleteDeptModal"
							id="deptDelBtn"
							onclick=delDepartment(${result.data[i].id});
						>
							<i class="fas fa-trash-alt"></i> 
						</button>
					</td>
				</tr>
            `);
		}
	},
});

// **************************************************************************

// Populate Locations modal and Drop down lists
$.ajax({
	url: 'libs/php/getAllLocations.php',
	type: 'POST',
	dataType: 'json',

	success: function (result) {
		for (i = 0; i < result.data.length; i++) {
			$('#locations').append(`
				<tr>
					<td id="locName"><b>${result.data[i].name}</b></td>
					<td>
						<button 
							type="button" 
							title="Edit" 
							class="btn btn-success btn-sm" 
							data-bs-toggle="modal" 
							data-bs-target="#updateLocationModal"
							onclick=populateLocationUpdate(${result.data[i].id})
						>
							<i class="fas fa-edit"></i> 
						</button>
					</td>
					<td>
						<button 
							type="button" 
							title="Delete" 
							class="btn btn-danger btn-sm loc-del"
							data-bs-toggle="modal" 
							data-bs-target="#deleteLocationModal"
							onclick=delLocation(${result.data[i].id});
						>
							<i class="fas fa-trash-alt"></i> 
						</button>
					</td>
				</tr>
			`);

			$('#deptLocation').append(`
		        <option value='${result.data[i].id}'>${result.data[i].name}</option>
		    `);

			$('#changeDeptLocation').append(`
		        <option value='${result.data[i].id}'>${result.data[i].name}</option>
            `);
		}
	},
});

// **************************************************************************

// Populate Employee Update Modal (before user updates)
function populateEmployeeUpdate(employeeID) {
	$.ajax({
		url: 'libs/php/getUpdateData.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: employeeID,
		},
		success: function (result) {
			$('#employeeID').val(result.data.personnel[0].id);
			$('#update_fname').val(result.data.personnel[0].firstName);
			$('#update_lname').val(result.data.personnel[0].lastName);
			$('#updateJobTitle').val(result.data.personnel[0].jobTitle);
			$('#updateEmail').val(result.data.personnel[0].email);
			$('#updateEmployeeDept').val(result.data.personnel[0].departmentID);
		},
	});
}

// **************************************************************************

// Populate Department Update Modal (before user updates)
function populateDeptUpdate(departmentID) {
	$.ajax({
		url: 'libs/php/getUpdateData.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: departmentID,
		},
		success: function (result) {
			$('#departmentID').val(result.data.department[0].id);
			$('#updateDeptName').val(result.data.department[0].name);
			$('#changeDeptLocation').val(result.data.department[0].locationID);
		},
	});
}

// **************************************************************************

// Populate Location Update Modal (before user updates)
function populateLocationUpdate(locationID) {
	$.ajax({
		url: 'libs/php/getUpdateData.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: locationID,
		},
		success: function (result) {
			$('#locationID').val(result.data.location[0].id);
			$('#updateLocName').val(result.data.location[0].name);
		},
	});
}

// **************************************************************************

// Add new Employee
$('#insertEmployee').submit(function () {
	$.ajax({
		url: 'libs/php/addEmployee.php',
		type: 'POST',
		dataType: 'json',
		data: {
			fname: $('#fname').val(),
			lname: $('#lname').val(),
			jobTitle: $('#jobTitle').val(),
			email: $('#email').val(),
			departmentID: $('#employeeDept').val(),
		},
		success: function (result) {},
	});
});

// **************************************************************************

// Add new Department
$('#addNewDept').submit(function () {
	$.ajax({
		url: 'libs/php/addDepartment.php',
		type: 'POST',
		dataType: 'json',
		data: {
			deptName: $('#deptName').val(),
			locationID: $('#deptLocation').val(),
		},
		success: function (result) {},
	});
});

// **************************************************************************

// Add new Location
$('#addNewLocation').submit(function () {
	$.ajax({
		url: 'libs/php/addLocation.php',
		type: 'POST',
		dataType: 'json',
		data: {
			locationName: $('#locName').val(),
		},
		success: function (result) {},
	});
});

// **************************************************************************

// Update Employee
$('#employeeUpdateConfirm').click(function () {
	$('.confirm-employee-update').show();
	$('#employeeUpdateConfirm').hide();
	$('#updateemployeeBtn').show();
});

$('#updateEmployee').submit(function () {
	$.ajax({
		url: 'libs/php/updateEmployee.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: $('#employeeID').val(),
			fname: $('#update_fname').val(),
			lname: $('#update_lname').val(),
			jobTitle: $('#updateJobTitle').val(),
			email: $('#updateEmail').val(),
			departmentID: $('#updateEmployeeDept').val(),
		},
		success: function (result) {
			$('#updateemployeeBtn').hide();
			$('#employeeUpdateConfirm').show();
			$('.confirm-employee-update').hide();
		},
	});
});

// **************************************************************************

// Update Department
$('#deptUpdateConfirm').click(function () {
	$('.confirm-dept-update').show();
	$('#deptUpdateConfirm').hide();
	$('#updateDeptBtn').show();
});

$('#updateDeptForm').submit(function () {
	$.ajax({
		url: 'libs/php/updateDepartment.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: $('#departmentID').val(),
			departmentName: $('#updateDeptName').val(),
			locationID: $('#changeDeptLocation').val(),
		},
		success: function (result) {
			$('#updateDeptBtn').hide();
			$('#deptUpdateConfirm').show();
			$('.confirm-dept-update').hide();
		},
	});
});

// **************************************************************************

// Update Location
$('#locUpdateConfirm').click(function () {
	$('.confirm-loc-update').show();
	$('#locUpdateConfirm').hide();
	$('#updateLocBtn').show();
});

$('#confirmLocChanges').submit(function () {
	$.ajax({
		url: 'libs/php/updateLocation.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: $('#locationID').val(),
			locationName: $('#updateLocName').val(),
		},
		success: function (result) {
			$('#updateLocBtn').hide();
			$('#locUpdateConfirm').show();
			$('.confirm-loc-update').hide();
		},
	});
});

// **************************************************************************

// Delete Employee
function delEmployee(employeeID) {
	$('#delEmployeeID').val(employeeID);
}

$('#confirmEmployeeDel').submit(function () {
	$.ajax({
		url: 'libs/php/deleteEmployee.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: $('#delEmployeeID').val(),
		},
		success: function (result) {},
	});
});

// **************************************************************************

// Delete Department Function
$('#deleteDeptBtn').click(function () {
	$.ajax({
		url: 'libs/php/deleteDepartment.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: $(this).val(),
		},
		success: function (result) {},
	});
});

// **************************************************************************

// Delete Department - Employee dependency warning
function delDepartment(departmentID) {
	$.ajax({
		url: 'libs/php/getEmployeesInDept.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: departmentID,
		},

		success: function (result) {
			var employeeCount = result.data.length;

			$('#deleteDeptBtn').val(departmentID);

			if (employeeCount == 1) {
				$('#deptDependancy').replaceWith(
					`<div id="deptDependancy"> 
					<h5>Error: This department has <span class="employeeCount">${employeeCount}</span> employee.</h5> 
					<br>
					<h5>Employees must be removed from department before deletion.</h5>
					</div>`
				);
				$('#deleteDeptBtn').hide();
			} else if (employeeCount > 1) {
				$('#deptDependancy').replaceWith(
					`<div id="deptDependancy"> 
					<h5>Error: This department has <span class="employeeCount">${employeeCount}</span> employees.</h5> 
					<br>
					<h5>Employees must be removed from department before deletion.</h5>
					</div>`
				);
				$('#deleteDeptBtn').hide();
			} else {
				$('#deptDependancy').replaceWith(
					`<div id="deptDependancy"> 
						<div class="mb-3">
							<h5>Are you sure you want to delete this record?</h5>
						</div>
						<div class="mb-3">
							<h6 class="text-danger">This action cannot be reversed.</h6>
						</div>
						<div class="mb-3 mt-2">
							<div class="form-check">
								<input
									class="form-check-input"
									type="checkbox"
									value=""
									id="invalidCheck"
									required
								/>
								<label class="form-check-label" for="invalidCheck">
									Please confirm deletion
								</label>
							</div>
						</div>
					</div>`
				);
				$('#deleteDeptBtn').show();
			}
		},
	});
}

// **************************************************************************

// Delete Location Function
$('#deleteLocBtn').click(function () {
	$.ajax({
		url: 'libs/php/deleteLocation.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: $(this).val(),
		},
		success: function (result) {},
	});
});

// **************************************************************************

// Delete Location - Department dependency warning
function delLocation(locationID) {
	$.ajax({
		url: 'libs/php/getDepartmentsInLoc.php',
		type: 'POST',
		dataType: 'json',
		data: {
			id: locationID,
		},

		success: function (result) {
			var deptCount = result.data.length;

			$('#deleteLocBtn').val(locationID);

			if (deptCount == 1) {
				$('#locDependancy').replaceWith(
					`<div id="locDependancy"> 
					<h5>Error: This location has <span class="deptCount">${deptCount}</span> department.</h5> 
					<br>
					<h5>Departments must be removed from location before deletion.</h5>
					</div>`
				);
				$('#deleteLocBtn').hide();
			} else if (deptCount > 1) {
				$('#locDependancy').replaceWith(
					`<div id="locDependancy"> 
					<h5>Error: This location has <span class="deptCount">${deptCount}</span> departments.</h5> 
					<br>
					<h5>Departments must be removed from location before deletion.</h5>
					</div>`
				);
				$('#deleteLocBtn').hide();
			} else {
				$('#locDependancy').replaceWith(
					`<div id="locDependancy"> 
						<div class="mb-3">
							<h5>Are you sure you want to delete this record?</h5>
						</div>
						<div class="mb-3">
							<h6 class="text-danger">This action cannot be reversed.</h6>
						</div>
						<div class="mb-3 mt-2">
							<div class="form-check">
								<input
									class="form-check-input"
									type="checkbox"
									value=""
									id="invalidCheck"
									required
								/>
								<label class="form-check-label" for="invalidCheck">
									Please confirm deletion
								</label>
							</div>
						</div>
					</div>`
				);
				$('#deleteLocBtn').show();
			}
		},
	});
}

// **************************************************************************

// Search box
$('#search').keyup(function () {
	var search = $(this).val(),
		count = 0;

	$('#employeeProfiles #employeeData').each(function () {
		if ($(this).text().search(new RegExp(search, 'i')) < 0) {
			$(this).hide();
		} else {
			$(this).show();
			count++;
		}
	});
});

// **************************************************************************

// Department modal on click UI transitions
$('#departmentModalAdd').click(function () {
	$('#departmentModal').modal('hide');
});

// **************************************************************************

// Location modal on click UI transitions
$('#locationModalAdd').click(function () {
	$('#locationModal').modal('hide');
});

// **************************************************************************

// Autofocus on input field on Add for Employee, Department & Location
$('#addEmployee').on('shown.bs.modal', function () {
	$('#fname').trigger('focus');
});

$('#addDepartment').on('shown.bs.modal', function () {
	$('#deptName').trigger('focus');
});

$('#addLocation').on('shown.bs.modal', function () {
	$('#locName').trigger('focus');
});

// **************************************************************************

// Pre loader
function preloaderFadeOutInit() {
	$('.preloader').fadeOut(3000);
	$('body').attr('id', '');
}
// Window load function
jQuery(window).on('load', function () {
	(function ($) {
		preloaderFadeOutInit();
	})(jQuery);
});
