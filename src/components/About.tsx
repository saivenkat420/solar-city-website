"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  SimpleGrid,
  Image,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const aboutText = `
Founded in 2020 during the pandemic, Solar City has quickly become a trusted leader in solar rooftop projects for both on-grid and off-grid systems. We specialize in delivering end-to-end solutions, including projects under the <span>PM Surya Ghar Yojana Muft Bijli Yojana scheme</span>. From application to installation, and even bank coordination, we handle everything so our customers can relax and enjoy the benefits of solar energy. Our journey began with selling second-hand solar plates, and through hands-on experience and continuous learning, we have expanded into every major stream of the solar industry. Today, we are proud to have completed over 40 rooftop projects, with 25 under the PM Surya Ghar Yojana scheme, and we maintain a 98% customer satisfaction rate.`;

const team = [
  {
    name: "Prabhakara Rao",
    title: "Chairman & Founder",
    img: "/prabhakara-rao-founder-img.png",
    bio: "Mr.Rao started Solar City in 2020, guiding the company from humble beginnings to a leader in solar rooftop solutions. His vision and dedication ensure every customer receives the best service.",
  },
  {
    name: "Satish",
    title: "Managing Director",
    img: "/satish-md-profile-pic.jpg",
    bio: "Satish oversees all projects, making sure every step is smooth and stress-free for our clients.",
  },
];

const testimonials = [
  {
    name: "Sunita Verma",
    img: "https://randomuser.me/api/portraits/women.jpg",
    review:
      "Solar City took care of everything for my rooftop project. The process was easy and I am very happy with the results!",
  },
  {
    name: "Rajesh Singh",
    img: "https://randomuser.me/api/portraits/men.jpg",
    review:
      "They handled my PM Surya Ghar Yojana application and installation perfectly. Highly recommended!",
  },
  {
    name: "Meena Joshi",
    img: "https://randomuser.me/api/portraits/women/51.jpg",
    review:
      "Professional, knowledgeable, and always available to answer my questions. My family is saving a lot on electricity now.",
  },
];

const projects = [
  {
    title: "PM Surya Ghar Yojana Project",
    img: "/pm-surya-ghar-yojana-solar-system-img.jpg",
    desc: "Completed 25+ rooftop solar installations under the PM Surya Ghar Yojana scheme, helping families get free electricity.",
  },
  {
    title: "On-Grid Rooftop System",
    img: "/on-grid-img.jpg",
    desc: "Installed advanced on-grid solar systems for homes and businesses, ensuring reliable and cost-effective power.",
  },
  {
    title: "Off-Grid Solar Solutions",
    img: "/off-grid-img.jpg",
    desc: "Delivered off-grid solar projects for remote areas, providing energy independence and peace of mind.",
  },
  {
    title: "Hybrid Solar Solutions",
    img: "/hybrid-solar-system-img.jpg",
    desc: "Delivered off-grid solar projects for remote areas, providing energy independence and peace of mind.",
  },
];

const About = () => {
  const bg = useColorModeValue("white", "gray.800");
  const text = useColorModeValue("gray.700", "gray.200");
  return (
    <Box pt={0} pb="30px" bg={bg}>
      <Container maxW="container.lg" px={{ base: 2, sm: 4, md: 8 }}>
        <VStack spacing={12} align="center" textAlign="center">
          <Heading
            as="h2"
            size={{ base: "lg", md: "xl" }}
            bgGradient="linear(to-r, solar.500, sky.500)"
            bgClip="text"
          >
            About Us
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color={text}
            maxW="2xl"
            textAlign="justify"
          >
            Founded in 2020 during the pandemic, Solar City has quickly become a
            trusted leader in solar rooftop projects for both on-grid and
            off-grid systems. We specialize in delivering end-to-end solutions,
            including projects under the
            <Link
              href="https://pmsuryaghar.gov.in/"
              isExternal
              fontWeight="bold"
              color="solar.500"
              textDecoration="underline"
              textUnderlineOffset="4px"
              _hover={{
                color: "sky.500",
                textDecoration: "underline",
                textDecorationThickness: "3px",
              }}
              mx={1}
              display="inline-flex"
              alignItems="center"
            >
              PM Surya Ghar Yojana Muft Bijli Yojana scheme{" "}
              <ExternalLinkIcon ml={1} boxSize={4} />
            </Link>
            . From application to installation, and even bank coordination, we
            handle everything so our customers can relax and enjoy the benefits
            of solar energy. Our journey began with selling second-hand solar
            plates, and through hands-on experience and continuous learning, we
            have expanded into every major stream of the solar industry. Today,
            we are proud to have completed over 40 rooftop projects, with 25
            under the PM Surya Ghar Yojana scheme, and we maintain a 98%
            customer satisfaction rate.
          </Text>

          {/* Meet Our Team */}
          <VStack spacing={6} w="100%">
            <Heading as="h3" size="lg" color="solar.500">
              Meet Our Team
            </Heading>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 2 }}
              spacing={4}
              w="100%"
            >
              {team.map((person) => (
                <VStack
                  key={person.name}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="lg"
                  p={3}
                  boxShadow="md"
                >
                  <Avatar
                    src={person.img}
                    name={person.name}
                    size="xl"
                    mb={1}
                  />
                  <Text fontWeight="semibold" fontSize="md">
                    {person.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {person.title}
                  </Text>
                  <Text fontSize="sm" color={text}>
                    {person.bio}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Customer Reviews */}
          <VStack spacing={6} w="100%">
            <Heading as="h3" size="lg" color="solar.500">
              Customer Reviews
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="100%">
              {testimonials.map((t) => (
                <VStack
                  key={t.name}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="lg"
                  p={3}
                  boxShadow="sm"
                >
                  <Avatar src=""  name={t.name} size="md" mb={1} />
                  <Text fontWeight="semibold" fontSize="md">
                    {t.name}
                  </Text>
                  <Text fontSize="sm" color={text} fontStyle="italic">
                    “{t.review}”
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Our Projects */}
          <VStack spacing={6} w="100%">
            <Heading as="h3" size="lg" color="solar.500">
              Our Projects
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
              {projects.map((p) => (
                <VStack
                  key={p.title}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="lg"
                  p={3}
                  boxShadow="sm"
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    borderRadius="md"
                    objectFit="cover"
                    w="100%"
                    h="150px"
                    mb={1}
                  />
                  <Text fontWeight="semibold" fontSize="md">
                    {p.title}
                  </Text>
                  <Text fontSize="sm" color={text}>
                    {p.desc}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default About;
