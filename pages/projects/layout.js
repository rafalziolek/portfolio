export default function Layout({handleThemeChange, children, isDarkTheme}) {
    return (
      <div>
        <main>{children}</main>
      </div>
    )
  }