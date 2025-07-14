import { T, Link } from '@admiral-ds/react-ui';


export default function App() {
  return (
    <>
      <T font="Header/HL1" as="p">Пример текста</T>
      <Link appearance="primary" href="https://admiralds.github.io/react-ui">
        Открыть Storybook
      </Link>
    </>
  );
}
            