import Text from "../Typography/Text";

const BodyHeaderContent: React.FC = () => {
  return (
    <>
      <main>
        <Text variant="h4" gutterBottom={true}>
          Product Feedback
        </Text>
        <Text variant="body2" gutterBottom={true}>
          Climate strives to bring the best experience during your item
          management.
        </Text>
        <Text variant="body2" gutterBottom={false}>
          With a potential to impact billions, Climate welcomes your feedback on
          its products.
        </Text>
        <br />
        <Text variant="body2" gutterBottom={true}>
          Begin by using the form below. Submitting this form does not guarentee
          a response from us. However, we do read each feedback carefully. To
          keep yourself updated with the changes in your feeback and our
          response, please be sure to add your email address during your form
          submission process.
        </Text>
        <br />
        <Text variant="body2" gutterBottom={true}>
          Please use the form below for your feedback. We read all feedback
          carefully, however due to the nature of feedbacks, we would be unable
          to respond to each submission individually. If you provide your email
          address, you agree that we may contact you to better understand the
          comments you submitted.
        </Text>
        <br />
        <br />
        <br />
      </main>
    </>
  );
};

export default BodyHeaderContent;
