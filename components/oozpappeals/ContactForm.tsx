"use client";

import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name: `${e.target.elements['last-name'].value} ${e.target.elements['first-name'].value}`,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      message: e.target.elements.message.value,
    };

    try {
      const response = await fetch('https://apocrypha.su/oozp_appeals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Отслеживаем успешную отправку формы
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(104384730, 'reachGoal', 'contact_form_submit_success');
        }
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'contact_form_submit_success');
        }
      } else {
        alert('Произошла ошибка при отправке. Попробуйте еще раз.');
        // Отслеживаем ошибку отправки
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(104384730, 'reachGoal', 'contact_form_submit_error');
        }
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'contact_form_submit_error');
        }
      }
    } catch (error) {
      alert('Произошла ошибка при отправке. Проверьте соединение.');
      // Отслеживаем ошибку сети
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(104384730, 'reachGoal', 'contact_form_network_error');
      }
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_form_network_error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <CardContent>
        <div className="text-center p-6">
          <div className="text-green-600 font-semibold text-lg mb-2">
            Спасибо за Ваше обращение!
          </div>
          <p className="text-gray-600">
            Максимальное время ожидания ответа: несколько часов
          </p>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium">
              Имя*
            </label>
            <Input 
              id="first-name" 
              placeholder="Иван" 
              required 
              disabled={isLoading}
              data-track-event="contact_form_first_name_focus"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium">
              Фамилия*
            </label>
            <Input 
              id="last-name" 
              placeholder="Иванов" 
              required 
              disabled={isLoading}
              data-track-event="contact_form_last_name_focus"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input 
            id="email" 
            type="email" 
            placeholder="example@mail.com" 
            disabled={isLoading}
            data-track-event="contact_form_email_focus"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Телефон*
          </label>
          <Input 
            id="phone" 
            placeholder="+375 XX XXX XX XX" 
            required 
            disabled={isLoading}
            data-track-event="contact_form_phone_focus"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Сообщение*
          </label>
          <Textarea 
            id="message" 
            placeholder="Опишите вашу проблему..." 
            rows={5} 
            required 
            disabled={isLoading}
            data-track-event="contact_form_message_focus"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          data-track-event="contact_form_submit_click"
        >
          {isLoading ? 'Отправка...' : 'Отправить'}
        </Button>
        <span className='text-gray-600 text-sm'>* - данные поля являются обязательными для отправки обращения</span>
      </form>
    </CardContent>
  );
};

export default ContactForm;