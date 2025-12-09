import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    // the `flex-1` class in main needs to stay, as it pushes the footer
    // down and keeps it fixed at the bottom
    <main className="flex-1 font-serif">
      <div className="text-center font-semibold text-3xl m-2 p-2"></div>
      <Outlet />
    </main>
  );
}

export default MainLayout;
