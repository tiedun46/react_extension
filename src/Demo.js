import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [fileJson, setFileJson] = useState();
  const [countRow, setCountRow] = useState(1);
  const [typeFill, setTypeFill] = useState(1);

  const createTbodyTableHtml = (data) => {
    // Tìm phần tử tbody của bảng trên trang web
    const tbody = document.querySelector('tbody');
    if (data) {
      // Tạo nội dung HTML cho các hàng của bảng
      let html = '';
      for (let i = 0; i < data[0].length; i++) {
        var obj = data[0][i];
        html += '<tr>';
          html += `<td>${obj.STT}</td>`;
          html += `<td>${obj["Họ tên"]}</td>`;
          html += `<td>${obj["Giới tính"]}</td>`;
          html += `<td>${obj["Ngày sinh"]}</td>`;
        html += '</tr>';
      }
  
      // Đặt nội dung HTML cho tbody của bảng
      console.log(html);
      tbody.innerHTML = html;
      // return html;
    }
  };

  const fileUpload = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetsJson = [];
      workbook.SheetNames.forEach(function (sheetName) {
        const worksheet = workbook.Sheets[sheetName];
        const sheetJSON = XLSX.utils.sheet_to_json(worksheet);
        sheetsJson.push(sheetJSON);
      });
      setFileJson(sheetsJson);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (!fileJson) {
      toast.error("Bạn chưa chọn file!");
    } else {
    console.log(fileJson);
    createTbodyTableHtml(fileJson);
    // fillTable(fileJson)
    }
  }

  // const fillTable = (data) => {
  //   const chrome = window.chrome || {};
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.executeScript(
  //       tabs[0].id,
  //       {
  //         code: `
  //           var tbody = document.querySelector('tbody');
  //           if (tbody) {
  //             tbody.innerHTML = '${createTbodyTableHtml(data)}';
  //           }
  //         `,
  //       },
  //       function () {
  //         console.log('Table filled successfully!');
  //       }
  //     );
  //   });
  // };

  return (
    <>
      <div className="container">
        <div className="row">
          {/* <div className="btn-group col-lg-12">
          <a href="#tab1" className="btn btn-primary active">
            Fill With Template
          </a>
          <a href="#tab2" className="btn btn-primary">
            Fill Simple
          </a>
        </div> */}

          <div className="col-lg-12 p-4 row d-flex justify-content-center">
            <h2 className="text-center">Thêm Dữ Liệu Vào Bảng</h2>
            <div className="col-lg-7 mb-2">
              <label htmlFor="formFile" className="form-label">
                Chọn file cần fill (File .xlsx phải đúng theo template mẫu)
              </label>
              <input
                className="form-control"
                onChange={(e) => fileUpload(e)}
                type="file"
                id="formFile"
              />
            </div>
            <div className="col-lg-7">
              <div className="mb-2">
                <label htmlFor="countRowFill" className="form-label">
                  Nhập số hàng bắt đầu fill
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={countRow}
                  onChange={(e) => setCountRow(parseInt(e.target.value))}
                  id="countRowFill"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="typeFill" className="form-label">
                  Chọn kiểu fill
                </label>
                <select
                  id="typeFill"
                  value={typeFill}
                  onChange={(e) => setTypeFill(parseInt(e.target.value))}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="1">Fill với Template</option>
                  <option value="2">Fill thường</option>
                </select>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-success"
              >
                Fill Dữ Liệu
              </button>
              <br></br>
              <small>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  Xem hướng dẫn sử dụng
                </a>
              </small>
              <br></br>
              <p className="text-center mt-2">
                Copyright © 2023 by VCS VietNam. all rights reserved
              </p>
            </div>
          </div>
        </div>

        <div className="table">
        <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Ngày sinh</th>
                  </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
