import React, { useState } from 'react';

import Personal from './components/FromStep/personal.jsx';
import Education from './components/FromStep/Education.jsx';
import Details from './components/FromStep/Details.jsx';
import Landing from './components/FromStep/Landing.jsx';
import Congratulations from './components/FromStep/Congratulations.jsx';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    residentialAddress: '',

    qualification: '',
    branch: '',
    semester: '',
    year: '',
    passoutYear: '',
    collegeName: '',

    center: '',
    course: '',
    source: '',
    references: '',
    callerName: '',
    counselor: '',
    otherCounselor: '',
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev < 3) {
        return prev + 1;
      }

      return prev;
    });
  };

  const handlePrev = () => {
    setCurrentStep((prev) => {
      if (prev > 1) {
        return prev - 1;
      }

      return prev;
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      console.log('Sending Data:', formData);

      const response = await fetch(
        'https://django-project-f-1.onrender.com/',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json().catch(() => null);

      console.log('API Response:', data);

      if (!response.ok) {
        let errorMessage = 'Registration submit nahi ho payi.';

        if (data?.detail) {
          errorMessage = data.detail;
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (typeof data === 'object' && data !== null) {
          errorMessage = Object.entries(data)
            .map(([key, value]) => {
              const message = Array.isArray(value)
                ? value.join(', ')
                : String(value);

              return `${key}: ${message}`;
            })
            .join(' | ');
        }

        throw new Error(errorMessage);
      }

      console.log('Registration Successful:', data);

      /*
       * API SUCCESS
       * Details page se Congratulations page par jayega
       */
      setCurrentStep(4);

    } catch (error) {
      console.error('Submission Error:', error);

      setSubmitError(
        error?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App min-h-screen bg-[#dceaf7]">

      {/* ================================================= */}
      {/* STEP 0 : LANDING */}
      {/* ================================================= */}

      {currentStep === 0 && (
        <Landing
          onRegister={() => {
            setSubmitError('');
            setCurrentStep(1);
          }}
        />
      )}

      {/* ================================================= */}
      {/* STEP 1 : PERSONAL */}
      {/* ================================================= */}

      {currentStep === 1 && (
        <Personal
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
        />
      )}

      {/* ================================================= */}
      {/* STEP 2 : EDUCATION */}
      {/* ================================================= */}

      {currentStep === 2 && (
        <Education
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      {/* ================================================= */}
      {/* STEP 3 : DETAILS */}
      {/* ================================================= */}

      {currentStep === 3 && (
        <>
          <Details
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onPrev={handlePrev}
          />

          {/* SUBMITTING OVERLAY */}

          {isSubmitting && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/40 px-5 backdrop-blur-md">

              <div className="w-full max-w-sm rounded-[30px] border border-white/70 bg-white/90 p-8 text-center shadow-[0_30px_100px_rgba(15,23,42,0.25)]">

                <div className="relative mx-auto mb-5 h-16 w-16">

                  <div className="absolute inset-0 animate-ping rounded-full bg-slate-900/10" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-900">

                    <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-white/30 border-t-white" />

                  </div>

                </div>

                <h2 className="text-lg font-black text-slate-900">
                  Submitting Enquiry
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Please wait while we submit your details...
                </p>

              </div>
            </div>
          )}

          {/* API ERROR */}

          {submitError && !isSubmitting && (
            <div className="fixed bottom-5 left-1/2 z-[9999] w-[calc(100%-30px)] max-w-xl -translate-x-1/2">

              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white/95 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">

                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  !
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-bold text-red-600">
                    Submission Failed
                  </p>

                  <p className="mt-1 break-words text-xs text-slate-500">
                    {submitError}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => setSubmitError('')}
                  className="ml-auto text-lg text-slate-400 transition hover:text-slate-900"
                >
                  ×
                </button>

              </div>

            </div>
          )}
        </>
      )}

      {/* ================================================= */}
      {/* STEP 4 : CONGRATULATIONS */}
      {/* ================================================= */}

      {currentStep === 4 && (
        <Congratulations
          formData={formData}
        />
      )}

    </div>
  );
}