export default function Footer() {
  return (
    <footer style={{
      marginTop: 48,
      padding: '16px 0 24px',
      textAlign: 'center',
      fontSize: 13,
      color: '#969696',
      borderTop: '1px solid #D9D9D9',
      lineHeight: 1.8,
    }}>
      <div>개발 및 수정문의: DESKER 김선영</div>
      <div>{__APP_VERSION__} &nbsp;|&nbsp; {__BUILD_TIME__}</div>
    </footer>
  )
}
