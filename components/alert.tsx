import Container from './container';

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return preview ? (
    <div className="border-neutral-800 bg-neutral-800 text-white">
      <Container>
        <div className="py-2 text-center text-sm">
          {preview && (
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline transition-colors duration-200 hover:text-teal-300"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          )}
        </div>
      </Container>
    </div>
  ) : (
    <></>
  );
};

export default Alert;
