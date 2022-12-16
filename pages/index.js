import Head from 'next/head';
import Image from 'next/image';
import styled  from 'styled-components';
import Header from '../Components/Header';
import { Project } from '../Components/Project';
import Text from '../Components/Text';
import Icon from '../Components/Icon';
import Stack from '../Components/Stack';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Rafał Ziółek — Product designer</title>
        <meta name="description" content="Product Designer based in Poland with 5 years of experience." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/mtj8ilt.css" />
      </Head>

      <Header>
        <Text tag="h3" type='MainHeading'>I’m Rafał Ziółek. <br/>Digital Product designer. Currently building design systems at Docplanner</Text>
      </Header>
      
      <Stack flexDirection='column' gap='m'>
        <Stack flexDirection='row' gap='xs' alignItems='center'>
          <Text tag='h2' type='SectionHeading'>Projects I have worked on</Text>
          <Icon name='arrowAngledDown' size='64' color='black'/>
        </Stack>
        <Project projectPath='#' projectName='Watson Design System' company='Docplanner' />
        <Project projectPath='#' projectName='Watson Design System' company='Docplanner' />
        <Project projectPath='#' projectName='Watson Design System' company='Docplanner' />
      </Stack>
    </div>
  )
}
