import Alert from './alert.js';
import LocalStorageFun from './localStorage.js';
import Validate from './valideted.js';

const student_form = document.getElementById('student_form');
const edit_form = document.getElementById('edit_form');
const msg = document.querySelector('.msg');
const output = document.querySelector('.output');
const view_data = document.querySelector('.view_data');

student_form.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());
  console.log(data);
  if (!data.name || !data.age || !data.cell || !data.email) {
    msg.innerHTML = Alert.danger('All fields are required !');
  } else if (!Validate.isEmail(data.email)) {
    msg.innerHTML = Alert.warning('Invalid email Adress!');
  } else if (!Validate.isAge(data.age)) {
    msg.innerHTML = Alert.warning('Invalid Age!');
  } else if (!Validate.isMobile(data.cell)) {
    msg.innerHTML = Alert.warning('Invalid Moblile!');
  } else {
    let AllData = [];
    if (LocalStorageFun.get('student')) {
      AllData = LocalStorageFun.get('student');
    }
    AllData.push(data);
    LocalStorageFun.save('student', AllData);
    msg.innerHTML = Alert.success('New student Added!');
    e.target.reset();
    getAlldat();
  }
};

const getAlldat = () => {
  let getlsdata = LocalStorageFun.get('student');

  let list = '';
  if (!getlsdata && getlsdata == '') {
    list = `
        <tr class ="text-center"><td  colspan ="3">No data found</td></tr>
        `;
  } else {
    getlsdata.map((item, index) => {
      list += `
            <tr class ="text-white align-middle ">
            <td style="width:10px text-white">${index + 1}</td>
            <td class="text-capitalize   text-white h6">
            <img style="width:50px; height:50px" src="${item.photo}">
            </td>
            <td class="text-capitalize w-50  text-white h6">${
              item.name
            }</td>
           
            <td class="text-capitalize   text-primary h6">${
              item.age
            }</td>
            <td class=" text-white h6">${item.email}</td>
            <td class="text-capitalize  text-white h6">${
              item.cell
            }</td>
            <td class ="w-25">
            <a index="${index}" data-bs-target="#view_form"  data-bs-toggle="modal" class="btn btn-sm btn-primary view"><i class ="fas fa-eye"></i></a>
            <a index="${index}" data-bs-target="#edit_form_model" data-bs-toggle="modal" class="btn btn-sm btn-warning edit"><i class ="fas fa-edit"></i></a>
            <a index="${index}"  class="btn btn-sm btn-danger delete"><i class ="fas fa-remove"></i></a>
            </td>
            </tr>

            `;
    });
  }
  output.innerHTML = list;
};
getAlldat();

output.onclick = (e) => {
  e.preventDefault();
  const index = e.target.getAttribute('index');
  const AllData = LocalStorageFun.get('student');
  if (e.target.classList.contains('delete')) {
    const afterDelete = AllData.filter(
      (element) => element != AllData[index]
    );
    LocalStorageFun.save('student', afterDelete);
    getAlldat();
  } else if (e.target.classList.contains('view')) {
    const viewData = AllData[index];
    let view = document.querySelector('view');
    view_data.innerHTML = `
      <img class="card-img-top my-3" style="with:100% ; height:300px" src="${viewData.photo}">
      <h4 class="text-warning">Name  : ${viewData.name}</h4>
      <h6>Email :${viewData.email}</h6>
      <h6>Mobile:${viewData.cell}</h6>
      `;
  } else if (e.target.classList.contains('edit')) {
    const editData = AllData[index];
    edit_form.innerHTML = `
    <div class="msg"></div>
    <div class="my-1">
        <label for="">Name</label>
        <input class="form-control" value="${editData.name}" type="text" name="edit_name" id="">
    </div>
    <div class="my-1">
        <label for="">Email</label>
        <input class="form-control" value="${editData.email}" type="email" name="edit_email" id="">
    </div>
    <div class="my-1">
        <label for="">Age</label>
        <input class="form-control" type="text" value="${editData.age}" name="edit_age" id="">
    </div>
    <div class="my-1">
        <label for="">Mobile</label>
        <input class="form-control" type="text" value="${editData.cell}" name="edit_cell" id="">
    </div>
    <div class="my-1">
        <label for="">Photo</label>
        <input class="form-control" type="text" value="${editData.photo}" name="edit_photo" id="">
    </div>
    <button class="w-100 btn btn-primary text-uppercase  text-white" type="submit" >Update</button>
     `;

    //  form submit
    edit_form.addEventListener('submit', (e) => {
      e.preventDefault();
      let edit_form_valu = new FormData(e.target);
      let updatData = Object.fromEntries(edit_form_valu.entries());
      let { edit_name, edit_cell, edit_email, edit_age, edit_photo } =
        Object.fromEntries(edit_form_valu.entries());
      AllData[index] = {
        photo: edit_photo,
        name: edit_name,
        cell: edit_cell,
        age: edit_age,
        email: edit_email,
      };
      LocalStorageFun.save('student', AllData);
      msg.innerHTML = Alert.success('Updated student data!');
      getAlldat();
    });
  }
};
