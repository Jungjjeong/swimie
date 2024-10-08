export function MyIcon(props?: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.1 6.543C8.1 4.11379 10.0699 2.14453 12.5 2.14453C14.9301 2.14453 16.9 4.11379 16.9 6.543C16.9 8.9722 14.9301 10.9415 12.5 10.9415C10.0699 10.9415 8.1 8.9722 8.1 6.543ZM6.705 13.769C8.225 12.8721 10.1725 12.3076 12.5 12.3076V12.3128C18.4956 12.3128 22 16.0324 22 19.5725C22 20.691 21.2558 21.4349 20.1369 21.4349H4.86306C3.74417 21.4349 3 20.691 3 19.5725C3 17.4094 4.31417 15.1777 6.705 13.769Z"
        fill={props?.fill || '#37383C'}
      />
    </svg>
  );
}
