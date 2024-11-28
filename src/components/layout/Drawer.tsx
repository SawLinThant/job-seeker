import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { menuList } from './menuData';
import { Collapse, Stack } from '@mui/material';
import { cn } from '@/utils/cn';
import { usePathname, useRouter } from 'next/navigation';
import Text from '../ui/typo';
import AppBar from './AppBar';
import { Icons } from '../ui/images/Icons';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.projectTheme.drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: theme.projectTheme.drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  height: '100vh',
  paper: {
    background: 'red',
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Drawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = React.useState<boolean>(true);
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (index: number) => {
    const isChild = menuList.some(
      (menu) => menu.children && menu.children.some((child) => child.link === menuList[index].link)
    );

    if (isChild) {
      setOpenItems((prevOpenItems) => {
        const currentIndex = prevOpenItems.indexOf(index);
        if (currentIndex !== -1) {
          // If the child is already open, close it
          return [
            ...prevOpenItems.slice(0, currentIndex),
            ...prevOpenItems.slice(currentIndex + 1),
          ];
        } else {
          // If the child is not open, close other children and open this one
          const parentIndex = menuList.findIndex(
            (menu) =>
              menu.children && menu.children.some((child) => child.link === menuList[index].link)
          );
          return [parentIndex, index];
        }
      });
    } else {
      setOpenItems((prevOpenItems) => (prevOpenItems.includes(index) ? [] : [index]));
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <DrawerStyled variant="permanent" open={open}>
        <Box
          className="bg-white"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pl: 2.5,
          }}
        >
          <Box className="flex gap-x-2 items-center">
            <Image src="/logo.svg" alt="jplus logo" width={28} height={28} priority />
            <Text className="text-sm text-primary font-bold">{theme.projectTheme.name}</Text>
          </Box>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
        </Box>
        {/* <Divider /> */}
        <List className="bg-white">
          {menuList.map((menu, key) => (
            <>
              {open && (key === 8 || key === 9) && (
                <p className="text-gray_500 font-bold text-xs px-3 mt-6 pb-3">
                  {key === 8 ? 'Communications' : key === 9 ? 'Setting' : ''}
                </p>
              )}
              <ListItem key={key} disablePadding sx={{ display: 'block' }}>
                <Link href={`/${currentLocale}${menu.link}`}>
                  <ListItemButton
                    selected={
                      `/${currentLocale}${menu.link}` === pathname || menu.link === pathname
                    }
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    className={cn(
                      '',
                      (pathname === `/${currentLocale}${menu.link}` ||
                        pathname === `/${currentLocale}${menu.defLink}` ||
                        pathname === menu.link ||
                        pathname === menu.defLink ||
                        openItems.includes(key)) &&
                        '!bg-blue_50 text-gray_700 '
                      // "!bg-primary !hover:bg-secondary text-white font-semibold !border-r-orange-700 !rounded-lg sm:m-[5px]"
                    )}
                    onClick={() => handleClick(key)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? '16px' : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText
                      className="!text-sm"
                      style={{
                        fontSize: '1px',
                      }}
                      sx={{ opacity: open ? 1 : 0 }}
                    >
                      <span className="text-xs font-semibold">{menu.label}</span>
                    </ListItemText>
                    {open && menu?.children?.length > 0 && (
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        {openItems.includes(key) ? (
                          <Icons.caretUp className="w-6 h-6" />
                        ) : (
                          <Icons.caretDown className="w-6 h-6" />
                        )}
                      </ListItemIcon>
                    )}
                  </ListItemButton>
                </Link>
                {open && menu?.children?.length > 0 && (
                  <Collapse in={openItems.includes(key)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {menu?.children?.map((child, i) => (
                        <Link key={i} href={child.link}>
                          <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                              sx={{ ml: !open ? 8 : 0, my: 0.5, pl: !open ? 0 : 7 }}
                              selected={
                                `${currentLocale}${child.link}` === pathname ||
                                child.link === pathname
                              }
                              className={cn(
                                'flex justify-start items-center align-middle hover:bg-secondary rounded-lg',
                                (`${currentLocale}${child.link}` === pathname ||
                                  child.link === pathname) &&
                                  '!bg-blue_50 text-gray_700 '
                              )}
                            >
                              {/* <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 1
                              }}
                            >
                              {child.icon}
                            </ListItemIcon> */}
                              <ListItemText>
                                <span className="text-xs font-semibold">{child.label}</span>
                              </ListItemText>
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                )}
              </ListItem>
            </>
          ))}
        </List>

        <div className="  w-full mt-36">
          <div className="mx-5 flex justify-between items-start my-4 pt-6 border-t border-[#EAECF0]">
            <div className="flex gap-x-2">
              <Image
                src={'/images/default-profile.svg'}
                alt="default profile"
                className="rounded-full"
                width={50}
                height={50}
              />
              <div className="mt-1 ">
                <p className="text-sm mb-1">Yoko</p>
                <div className="flex items-center gap-x-4">
                  <p className="text-xs">Owner</p>
                  <div className="w-[10px] h-[10px] flex justify-center items-center bg-[#F0F0F0] rounded-full">
                    {' '}
                    <div className="w-[5px] h-[5px] bg-red-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src={'/images/export-log-out.svg'}
              alt="default profile"
              className="rounded-full cursor-pointer"
              width={20}
              height={20}
              onClick={() => {
                React.startTransition(() => {
                  router.push(`/${currentLocale}/login`);
                });
              }}
            />
          </div>
        </div>
      </DrawerStyled>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box component="div">{children}</Box>
      </Box>
    </Box>
  );
};

export default Drawer;
