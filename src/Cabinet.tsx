/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';

export enum TypeEnum {
  BITRIX = 1,
  AMO_CRM = 2,
}

export const Cabinet = () => {
  const [formData, setFormData] = useState({
    name: '',
    crm_type: TypeEnum.AMO_CRM,
    webhook_or_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ1YzliNWQ0MmU1Njc1OTA4ZGE1ZjBlN2QwZTAxMTEzMDM2NWMzZjdiZTNmMmIzN2ZkOWFhNWIxMDM5Zjk3MjI5OTdjNTRkNjdmMzdiNGI3In0.eyJhdWQiOiI0Y2MyNDBhMi1mNWVlLTRhOWYtODVmYy0yMWJiZDI2ZjhiZDYiLCJqdGkiOiI0NWM5YjVkNDJlNTY3NTkwOGRhNWYwZTdkMGUwMTExMzAzNjVjM2Y3YmUzZjJiMzdmZDlhYTViMTAzOWY5NzIyOTk3YzU0ZDY3ZjM3YjRiNyIsImlhdCI6MTcyNTQ1NDQ1NywibmJmIjoxNzI1NDU0NDU3LCJleHAiOjE3NjcxMzkyMDAsInN1YiI6IjEwNzg2OTAyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMwODY4MTU0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOTYzNGIzMjQtMDc2NS00OTk0LThkYmItMjE3M2QyOWIxYzc5IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.QBBBqf7IUQ7c1FJJ0eKY_RFU_QEq4vxYKFdb15YXIS5Q--ivIjQhzMvL_RMPxPkMQU-RIzcXQPUpFB_iuqdFx8leW9Ao5rHp6MjKKFObgDFAiAifu7tZhUMW7ZbdLW5sx5PIuaU7H4GpmlQGVblbIl-spOVLopCQYaVJ1-pP97580iWdVnI8B-nEP5oa1E70IW8Nk3JsmZL5JxBfXM98RAEwD2M3IHhfWDyTOJ6aXYBpN3CJsYFom961MDKw3XtIYlKGcpuw0G9nK2uRtl0AxEQImwYA7yQcmsnaJuRydttcoCPwOaMD43Y5CHBb3if5S4j3uOB68_hMphDgoB6f0g',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'crm_type' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      await axios.post(
        'https://test.satoo.kz/api/accounts/v1/companies',
        {
          crm: {
            crm_type: formData.crm_type,
            token: formData.webhook_or_token,
          },
          name: formData.name,
        },
        {
          withCredentials: true,
        }
      );
      alert('Компания успешно создана!');
    } catch (e) {
      console.error('Form submission failed:', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h4>Шаг 1. Название компании и подключение к CRM</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>1. Напишите имя компании</label>
          <input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Введите имя компании'
            required
          />
        </div>
        <div>
          <label htmlFor='crm_type'>2. Выберите тип CRM</label>
          <select id='crm_type' name='crm_type' value={formData.crm_type} onChange={handleChange} required>
            <option value='' disabled>
              Выберите тип CRM
            </option>
            <option value={TypeEnum.BITRIX}>Bitrix</option>
            <option value={TypeEnum.AMO_CRM}>Amo CRM</option>
          </select>
        </div>
        {formData.crm_type === TypeEnum.BITRIX && (
          <div>
            <label htmlFor='webhook_or_token'>Вебхук</label>
            <input
              id='webhook_or_token'
              name='webhook_or_token'
              type='text'
              value={formData.webhook_or_token}
              onChange={handleChange}
              placeholder='Введите вебхук'
              required
            />
          </div>
        )}
        {formData.crm_type === TypeEnum.AMO_CRM && (
          <div>
            <label htmlFor='webhook_or_token'>Токен</label>
            <input
              id='webhook_or_token'
              name='webhook_or_token'
              type='text'
              value={formData.webhook_or_token}
              onChange={handleChange}
              placeholder='Введите токен'
              required
            />
          </div>
        )}
        <button type='submit' disabled={submitting}>
          Далее
        </button>
      </form>
    </>
  );
};
