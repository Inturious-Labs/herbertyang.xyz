import React from 'react';

export default function LangToggle() {
  const [lang, setLang] = React.useState('en');

  React.useEffect(() => {
    document.querySelectorAll('.bcard-lang-en').forEach(el => {
      el.style.display = lang === 'en' ? 'block' : 'none';
    });
    document.querySelectorAll('.bcard-lang-cn').forEach(el => {
      el.style.display = lang === 'cn' ? 'block' : 'none';
    });
  }, [lang]);

  return (
    <div className="bcard-lang-toggle">
      <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      <button className={lang === 'cn' ? 'active' : ''} onClick={() => setLang('cn')}>CN</button>
    </div>
  );
}
