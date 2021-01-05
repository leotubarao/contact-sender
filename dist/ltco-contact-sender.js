"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUrlSender = function getUrlSender(form) {
  var senderPath = '/contact-sender/dist/includes/sender.php';
  var senderAttr = form.getAttribute('data-form-sender') || './';
  if (senderAttr.slice(-1) === '/') senderAttr = senderAttr.slice(0, -1);
  if (senderAttr.slice(-2) === 'cs') senderPath = senderPath.slice(15);
  if (senderAttr.slice(-2) === 'cs') senderAttr = senderAttr.slice(0, -2);
  if (senderPath.slice(15) !== '/contact-sender') senderPath = '..' + senderPath;
  return senderAttr + senderPath;
};

var isValid = function isValid(field) {
  if (field.checkValidity) return field.checkValidity();
  var isValid = true;
  var value = field.value;
  var type = field.getAttribute('type');
  var isRequired = field.getAttribute('required');
  if (value) isValid = !('email' === type && !/^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i.test(value));else if (isRequired) isValid = false;
  field.classList[isValid ? 'remove' : 'add']('is-invalid');
  return isValid;
};

var getFieldsData = function getFieldsData(fields) {
  var data = [];
  var isValidForm = true;
  fields.forEach(function (field) {
    if (!isValid(field)) isValidForm = false;
    data.push([field.getAttribute('data-form-field') || field.getAttribute('name'), field.value]);
  });
  return {
    isValidForm: isValidForm,
    data: JSON.stringify(data)
  };
};

var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event, form) {
    var senderUrl, fields, alert, submit, submitText, _getFieldsData, isValidForm, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            senderUrl = getUrlSender(form);
            fields = form.querySelectorAll('[data-form-field]:not([type="hidden"])');
            alert = form.querySelector('[data-form-alert]');
            submit = form.querySelector('[type="submit"]');
            submitText = submit.innerText;
            form.classList.add('was-validated');
            _getFieldsData = getFieldsData(fields), isValidForm = _getFieldsData.isValidForm, data = _getFieldsData.data;

            if (isValidForm) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return");

          case 10:
            submit.setAttribute('disabled', 'disabled');
            submit.innerText = 'ENVIANDO...';
            alert.setAttribute('hidden', 'hidden');
            alert.classList.remove(['alert-success', 'alert-danger']);
            fields.forEach(function (field) {
              return field.classList.remove('is-invalid');
            });
            _context.prev = 15;
            _context.next = 18;
            return axios.post(senderUrl, data).then(function (_ref2) {
              var response = _ref2.data;
              alert.innerText = response.message;
              alert.classList.add("alert-".concat(response["class"]));
              alert.removeAttribute('hidden');
              if (response.error) console.error('LTCO Contact Sender:', response.error);
              if (!response.ok) return;
              if (response.ok) fields.forEach(function (field) {
                return field.value = '';
              });
            });

          case 18:
            _context.next = 27;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](15);
            console.error(_context.t0);
            alert.innerText = 'Houve um erro no formulário, por favor, tente novamente mais tarde.';
            alert.classList.add("alert-danger");
            alert.removeAttribute('hidden');
            fields.forEach(function (field) {
              return field.value = '';
            });

          case 27:
            _context.prev = 27;
            form.classList.remove('was-validated');
            submit.removeAttribute('disabled');
            submit.innerText = submitText;
            return _context.finish(27);

          case 32:
            return _context.abrupt("return");

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[15, 20, 27, 32]]);
  }));

  return function handleSubmit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

document.querySelectorAll('[data-form-type="ltco_form"]').forEach(function (form) {
  var submit = form.querySelector('[type="submit"]');
  submit.addEventListener('click', function (e) {
    return handleSubmit(e, form);
  }, false);
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBSSxJQUFKLENBQWhCO0FBQUEsR0FBbEMsRUFBNkQsS0FBN0Q7QUFDRCxDQUpEIiwiZmlsZSI6Imx0Y28tY29udGFjdC1zZW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZXRVcmxTZW5kZXIgPSBmb3JtID0+IHtcclxuICBsZXQgc2VuZGVyUGF0aCA9ICcvY29udGFjdC1zZW5kZXIvZGlzdC9pbmNsdWRlcy9zZW5kZXIucGhwJztcclxuXHJcbiAgbGV0IHNlbmRlckF0dHIgPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1mb3JtLXNlbmRlcicpIHx8ICcuLyc7XHJcblxyXG4gIGlmIChzZW5kZXJBdHRyLnNsaWNlKC0xKSA9PT0gJy8nKSBzZW5kZXJBdHRyID0gc2VuZGVyQXR0ci5zbGljZSgwLCAtMSk7XHJcbiAgaWYgKHNlbmRlckF0dHIuc2xpY2UoLTIpID09PSAnY3MnKSBzZW5kZXJQYXRoID0gc2VuZGVyUGF0aC5zbGljZSgxNSk7XHJcbiAgaWYgKHNlbmRlckF0dHIuc2xpY2UoLTIpID09PSAnY3MnKSBzZW5kZXJBdHRyID0gc2VuZGVyQXR0ci5zbGljZSgwLCAtMik7XHJcbiAgaWYgKHNlbmRlclBhdGguc2xpY2UoMTUpICE9PSAnL2NvbnRhY3Qtc2VuZGVyJykgc2VuZGVyUGF0aCA9ICcuLicgKyBzZW5kZXJQYXRoO1xyXG5cclxuICByZXR1cm4gc2VuZGVyQXR0ciArIHNlbmRlclBhdGg7XHJcbn07XHJcblxyXG5jb25zdCBpc1ZhbGlkID0gZmllbGQgPT4ge1xyXG4gIGlmIChmaWVsZC5jaGVja1ZhbGlkaXR5KSByZXR1cm4gZmllbGQuY2hlY2tWYWxpZGl0eSgpO1xyXG5cclxuICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgY29uc3QgeyB2YWx1ZSB9ID0gZmllbGQ7XHJcbiAgY29uc3QgdHlwZSA9IGZpZWxkLmdldEF0dHJpYnV0ZSgndHlwZScpO1xyXG4gIGNvbnN0IGlzUmVxdWlyZWQgPSBmaWVsZC5nZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJyk7XHJcblxyXG4gIGlmICh2YWx1ZSkgaXNWYWxpZCA9ICEoJ2VtYWlsJyA9PT0gdHlwZSAmJiAhL14oW15AXSs/KUAoKFthLXowLTldLSopKlthLXowLTldK1xcLikrKFthLXowLTldKykkL2kudGVzdCh2YWx1ZSkpO1xyXG5cclxuICBlbHNlIGlmIChpc1JlcXVpcmVkKSBpc1ZhbGlkID0gZmFsc2U7XHJcblxyXG4gIGZpZWxkLmNsYXNzTGlzdFtpc1ZhbGlkID8gJ3JlbW92ZScgOiAnYWRkJ10oJ2lzLWludmFsaWQnKTtcclxuXHJcbiAgcmV0dXJuIGlzVmFsaWQ7XHJcbn07XHJcblxyXG5jb25zdCBnZXRGaWVsZHNEYXRhID0gZmllbGRzID0+IHtcclxuICBsZXQgZGF0YSA9IFtdO1xyXG4gIGxldCBpc1ZhbGlkRm9ybSA9IHRydWU7XHJcblxyXG4gIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgIGlmICghaXNWYWxpZChmaWVsZCkpIGlzVmFsaWRGb3JtID0gZmFsc2U7XHJcblxyXG4gICAgZGF0YS5wdXNoKFtcclxuICAgICAgZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWZvcm0tZmllbGQnKSB8fCBmaWVsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSxcclxuICAgICAgZmllbGQudmFsdWVcclxuICAgIF0pO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXNWYWxpZEZvcm0sXHJcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICB9O1xyXG59XHJcblxyXG5jb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZXZlbnQsIGZvcm0pID0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCBzZW5kZXJVcmwgPSBnZXRVcmxTZW5kZXIoZm9ybSk7XHJcblxyXG4gIGNvbnN0IGZpZWxkcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZm9ybS1maWVsZF06bm90KFt0eXBlPVwiaGlkZGVuXCJdKScpO1xyXG4gIGNvbnN0IGFsZXJ0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mb3JtLWFsZXJ0XScpO1xyXG4gIGNvbnN0IHN1Ym1pdCA9IGZvcm0ucXVlcnlTZWxlY3RvcignW3R5cGU9XCJzdWJtaXRcIl0nKTtcclxuICBjb25zdCBzdWJtaXRUZXh0ID0gc3VibWl0LmlubmVyVGV4dDtcclxuXHJcbiAgZm9ybS5jbGFzc0xpc3QuYWRkKCd3YXMtdmFsaWRhdGVkJyk7XHJcblxyXG4gIGxldCB7IGlzVmFsaWRGb3JtLCBkYXRhIH0gPSBnZXRGaWVsZHNEYXRhKGZpZWxkcyk7XHJcblxyXG4gIGlmICghaXNWYWxpZEZvcm0pIHJldHVybjtcclxuXHJcbiAgc3VibWl0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICBzdWJtaXQuaW5uZXJUZXh0ID0gJ0VOVklBTkRPLi4uJztcclxuXHJcbiAgYWxlcnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnaGlkZGVuJyk7XHJcbiAgYWxlcnQuY2xhc3NMaXN0LnJlbW92ZShbJ2FsZXJ0LXN1Y2Nlc3MnLCAnYWxlcnQtZGFuZ2VyJ10pO1xyXG4gIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IGZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWludmFsaWQnKSk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBheGlvc1xyXG4gICAgLnBvc3Qoc2VuZGVyVXJsLCBkYXRhKVxyXG4gICAgLnRoZW4oKHsgZGF0YTogcmVzcG9uc2UgfSkgPT4ge1xyXG4gICAgICBhbGVydC5pbm5lclRleHQgPSByZXNwb25zZS5tZXNzYWdlO1xyXG4gICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKGBhbGVydC0ke3Jlc3BvbnNlLmNsYXNzfWApO1xyXG4gICAgICBhbGVydC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSBjb25zb2xlLmVycm9yKCdMVENPIENvbnRhY3QgU2VuZGVyOicsIHJlc3BvbnNlLmVycm9yKTtcclxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiBmaWVsZC52YWx1ZSA9ICcnKTtcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHJcbiAgICBhbGVydC5pbm5lclRleHQgPSAnSG91dmUgdW0gZXJybyBubyBmb3JtdWzDoXJpbywgcG9yIGZhdm9yLCB0ZW50ZSBub3ZhbWVudGUgbWFpcyB0YXJkZS4nO1xyXG4gICAgYWxlcnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtZGFuZ2VyYCk7XHJcbiAgICBhbGVydC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG5cclxuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IGZpZWxkLnZhbHVlID0gJycpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3dhcy12YWxpZGF0ZWQnKTtcclxuXHJcbiAgICBzdWJtaXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgc3VibWl0LmlubmVyVGV4dCA9IHN1Ym1pdFRleHQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm47XHJcbn1cclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZvcm0tdHlwZT1cImx0Y29fZm9ybVwiXScpLmZvckVhY2goZm9ybSA9PiB7XHJcbiAgY29uc3Qgc3VibWl0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cInN1Ym1pdFwiXScpO1xyXG5cclxuICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IGhhbmRsZVN1Ym1pdChlLCBmb3JtKSwgZmFsc2UpO1xyXG59KTtcclxuIl19