import React, { useState, ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './Worksheet.module.css';

export interface WorksheetField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'number';
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export interface WorksheetProps {
  title: string;
  fields: WorksheetField[];
  onSave?: (data: Record<string, string>) => void;
  storageKey?: string;
}

export function Worksheet({
  title,
  fields,
  onSave,
  storageKey,
}: WorksheetProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    if (storageKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const handleChange = (
    id: string,
    value: string,
    event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValues = { ...values, [id]: value };
    setValues(newValues);

    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(newValues));
    }
  };

  const handleSave = () => {
    onSave?.(values);
  };

  return (
    <div className={styles.worksheet}>
      <div className={styles.title}>
        <span className={styles.titleIcon}>📝</span>
        {title}
      </div>

      <div className={styles.fields}>
        {fields.map((field) => (
          <div key={field.id} className={styles.field}>
            <label className={styles.label} htmlFor={field.id}>
              {field.label}
              {field.required && <span className={styles.required}>*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                className={styles.textarea}
                placeholder={field.placeholder}
                rows={field.rows || 4}
                value={values[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value, e)}
              />
            ) : (
              <input
                id={field.id}
                type={field.type}
                className={styles.input}
                placeholder={field.placeholder}
                value={values[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value, e)}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          className={clsx(styles.saveButton, values && styles.saveButtonActive)}
          onClick={handleSave}
          type="button"
        >
          💾 Save Progress
        </button>
        <span className={styles.autoSaveNote}>
          {storageKey ? 'Auto-saves locally' : 'Progress not saved'}
        </span>
      </div>
    </div>
  );
}
