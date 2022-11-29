import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { PropsWithChildren } from 'react';

function Layout(props: PropsWithChildren) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
