import { useTranslation } from 'react-i18next';
import Accordion from './Accordion';
import Select from 'react-select'
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import SearchIcon from '@/components/icons/searchIcon';

const FAQ = () => {

    const {t}=useTranslation()
  const FAQItems = [
    {
      id: 1,
      title: 'Who can apply for jobs on J Plus?',
      description:
        'faq_desc_one_lbl',
    },
    {
      id: 2,
    title: 'How do I apply for a job?',
      description:
        'faq_desc_two_lbl',
    },
    {
      id: 3,
   title: 'Is there a fee to use J Plus?',
      description:
        'faq_desc_three_lbl',
    },
    {
      id: 4,
    title: 'Do I need to know Japanese?',
      description:
        'faq_desc_four_lbl',
    },
    {
      id: 5,
    title: 'How long does the hiring process take?',
      description:
        'faq_desc_five_lbl',
    },
    {
      id: 6,
    title: 'What support do you provide after getting hired?',
      description:
        'faq_desc_six_lbl',
    },
  ];

  return (
    <section id="FAQ" className="bg-[#FCFCFD] py-6 md:py-10">
      <div className="container mx-auto md:px-4">
        <div className="mb-10 md:mb-16">
          <h1 className="text-base md:text-3xl font-semibold text-[#1D2939] text-center mb-2.5 md:mb-5">
            <span className="text-primary ">
              {/* {t("faq_hub_lbl")} */}
              {t("ask_question_lbl")}
              </span> 
          </h1>
          <p className="text-sm md:text-md lg:text-xl leading-2 px-3 font-medium text-[#475467] text-center">
           {t("everything_you_need_to_know_about_jplus_is_here_lbl")}
          </p>
        </div>
<div className="mb-12 px-3">
   <div className='flex items-center gap-2 justify-center'>
      <div className='w-[400px]'>
              <div>
              <Select
                  className='text-sm'
                  isMulti
                  menuPortalTarget={document.body}
                  menuPosition='fixed'
                  options={[
                  
                      {
                        label: "text",
                        value: "test",
                      }
                  ]}
                  placeholder={t("job_type_lbl")}
                  styles={{

                    control: (base: any) => ({
                      ...base,
                      border: '1.5px solid #D0D5DD',
                      boxShadow: 'none !important',
                      borderRadius:"10px",
                      '*': {
                        boxShadow: 'none !important',
                      },
                      '&:hover': {
                        border: '1.5px solid #D0D5DD !important',
                      },
                      height: 53,
                      minHeight: 53,
                    }),

                    menu: provided => ({
                      ...provided, zIndex: 100000000000
                    })

                  }}
                />
              </div>
                
      </div>
      <PrimaryButton className="py-3 flex items-center gap-x-3 px-4">
              <SearchIcon/>  <p>{t("search_lbl")} </p>
        </PrimaryButton>
   </div>
</div>
        <Accordion FAQItems={FAQItems} />
      </div>
    </section>
  );
};

export default FAQ;
