// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const ErrorMessageHandler = ({ status, defaultMessage }) => {
  const [msg, setMsg] = useState('Terjadi kesalahan yang tidak diketahui');

  useEffect(() => {
    switch (status) {
      case 0:
        setMsg('Kesalahan jaringan, harap periksa koneksi internet Anda!');
        break;

      default:
        if (defaultMessage) {
          setMsg(defaultMessage);
        }
        break;
    }
  }, [defaultMessage, status]);

  return msg;
};

export default ErrorMessageHandler;
