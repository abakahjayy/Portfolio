import { Box, Container, Heading, Text, Accordion } from "@chakra-ui/react";
import { motion } from "framer-motion";

const faqs = [
  { q: "What determines the final pricing of a project?", a: "Pricing is based on project complexity, number of pages, required features (like e-commerce, AI integrations, or custom backends), and the estimated timeline. The packages above serve as starting points." },
  { q: "How long does a typical project take?", a: "A standard business website takes 2-4 weeks. Complex web applications and custom software can take anywhere from 1-3 months depending on the scope and requirements." },
  { q: "Do you provide ongoing support and maintenance?", a: "Yes, every project includes a period of free support post-launch. I also offer monthly retainer packages for continuous maintenance, updates, and server management." },
  { q: "Do you offer domain registration and hosting?", a: "While I don't sell domains directly, I will guide you through purchasing one and handle the entire deployment process on premium cloud providers like AWS, Vercel, or Render." },
  { q: "What is your payment structure?", a: "Standard projects require a 50% deposit upfront to begin work, with the remaining 50% due upon project completion and before final deployment." }
];

export function FAQ() {
  return (
    <Box as="section" py={32} position="relative">
      <Container maxW="container.md">
        <Box textAlign="center" mb={16}>
          <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontFamily="heading" fontWeight="800" mb={4}>
            Frequently Asked Questions
          </Heading>
          <Text color="textMuted" fontSize="lg">
            Common questions about my process, pricing, and services.
          </Text>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion.Root collapsible variant="enclosed" defaultValue={[]}>
            {faqs.map((faq, idx) => (
              <Accordion.Item
                key={idx}
                value={`item-${idx}`}
                border="1px solid"
                borderColor="borderBase"
                bg="panel"
                mb={4}
                borderRadius="xl"
                overflow="hidden"
              >
                <Accordion.ItemTrigger
                  py={5}
                  px={6}
                  fontFamily="heading"
                  fontWeight="bold"
                  fontSize="lg"
                  _hover={{ color: "brand.500" }}
                >
                  <Box flex="1" textAlign="left">
                    {faq.q}
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody
                    px={6}
                    pb={5}
                    pt={0}
                    lineHeight="1.6"
                    color="textMuted"
                  >
                    {faq.a}
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </Container>
    </Box>
  );
}
