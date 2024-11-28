import React from 'react';
import Text from '../ui/typo';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const AppBarLabel = () => {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  let currentLocale = i18n.language;

  let labelA = [''];

  switch (pathname) {
    case `/${currentLocale}`:
      labelA = ['Dashboard'];
      break;
    case `/${currentLocale}/dashboard`:
      labelA = ['Dashboard'];
      break;
    case `/dashboard`:
      labelA = ['Dashboard'];
      break;
    case `/${currentLocale}/jobs/list`:
      labelA = ['Jobs', 'Jobs List'];
      break;
    case `/jobs/list`:
      labelA = ['Jobs', 'Jobs List'];
      break;
    case `/${currentLocale}/jobs/hiring-list`:
      labelA = ['Jobs', 'Jobs List'];
      break;
    case `/jobs/hiring-list`:
      labelA = ['Jobs', 'Jobs List'];
      break;
    case `/${currentLocale}/paper-work`:
      labelA = ['Paper Work', 'Paper Work List'];
      break;
    case `/paper-work`:
      labelA = ['Paper Work', 'Paper Work List'];
      break;
    case `/${currentLocale}/employee`:
      labelA = ['Employee', 'Employee List'];
      break;
    case `/employee`:
      labelA = ['Employee', 'Employee List'];
      break;
    case `/${currentLocale}/student`:
      labelA = ['Student', 'Student List'];
      break;
    case `/student`:
      labelA = ['Student', 'Student List'];
      break;
    case `/${currentLocale}/agent`:
      labelA = ['Agent', 'Agent List'];
      break;
    case `/agent`:
      labelA = ['Agent', 'Agent List'];
      break;
    case `/${currentLocale}/owners/list`:
      labelA = ['Owners', 'Owners List'];
      break;
    case `/owners/list`:
      labelA = ['Owners', 'Owners List'];
      break;
    case `/${currentLocale}/owners/business`:
      labelA = ['Owners', 'Business'];
      break;
    case `/owners/business`:
      labelA = ['Owners', 'Business'];
      break;
    case `/${currentLocale}/interview`:
      labelA = ['Interview', 'List'];
      break;
    case `/interview`:
      labelA = ['Interview', 'List'];
      break;
    case `/${currentLocale}/inbox`:
      labelA = ['Inbox', 'List'];
      break;
    case `/inbox`:
      labelA = ['Inbox', 'List'];
      break;
    case `/${currentLocale}/connects`:
      labelA = ['Connects', 'List'];
      break;
    case `/connects`:
      labelA = ['Connects', 'List'];
      break;
    case `/${currentLocale}/setting`:
      labelA = ['Setting', 'List'];
      break;
    case `/setting`:
      labelA = ['Setting', 'List'];
      break;
    case `/${currentLocale}/inbox`:
      labelA = ['Inbox', 'List'];
      break;
    case `/inbox`:
      labelA = ['Inbox', 'List'];
      break;
    case `/${currentLocale}/connects`:
      labelA = ['Connects', 'List'];
      break;
    case `/connects`:
      labelA = ['Connects', 'List'];
      break;
    case `/${currentLocale}/setting`:
      labelA = ['Setting', 'List'];
      break;
    case `/setting`:
      labelA = ['Setting', 'List'];
      break;
    default:
      labelA = [''];
  }

  return (
    <div className="flex gap-x-2">
      {labelA.map((_, i) => (
        <div key={i}>
          <div className="flex gap-x-2 items-center">
            <Text className="text-gray_700">{_}</Text>

            {labelA?.length !== i + 1 && <MdKeyboardDoubleArrowRight className="text-gray_700" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppBarLabel;
