<?php

namespace App\Controller;

use App\Entity\Event;
use App\Form\EventType;
use App\Repository\ParticipantRepository;
use App\Service\RandomDraw;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home(Request $request, MailerInterface $mailer): Response
    {
        $event = new Event;
        
        $form = $this->createForm(EventType::class, $event);
        
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($event);

            $participants = $event->getParticipants();
            $host = $participants[1];
            $host->setIsHost(true);

            foreach ($participants as $participant) {
                $participant->setEvent($event);
            }
            $em->flush();
            
            $mail = (new TemplatedEmail())
                ->to(new Address($host->getEmail()))
                ->subject('Confirm your draw')
                ->htmlTemplate('emails/confirm.html.twig')
                ->context([
                    'name' => $host->getName(),
                    'event' => $event,
                ]);

            $mailer->send($mail);

            return $this->redirectToRoute('confirm');
        }

        $submittedEvents = $form->getData();

        return $this->render('main/home.html.twig', [
            'form' => $form->createView(),
            'submittedParticipants' => $submittedEvents->getParticipants(),
        ]);
    }

    /**
     * @Route("/confirm", name="confirm", methods={"GET"})
     */
    public function confirm()
    {
        return $this->render('main/confirm.html.twig');
    }

    /**
     * @Route("/success", name="success", methods={"GET"})
     */
    public function success()
    {
        return $this->render('main/success.html.twig');
    }

    /**
     * @Route("/draw/{id}", name="draw", methods={"GET"})
     */
    public function draw(Event $event, RandomDraw $randomDraw, MailerInterface $mailer, ParticipantRepository $participantRepository)
    {
        $participants = $randomDraw->runDraw($event);

        $host = $participantRepository->getHost($event);

        foreach ($participants as $participant ) {
            $mail = (new TemplatedEmail())
                ->to(new Address($participant->getEmail()))
                ->subject('The Secret Santa is on its way !')
                ->htmlTemplate('emails/draw.html.twig')
                ->context([
                    'sender' => $participant,
                    'recipient' => $participant->getRecipient(),
                    'event' => $event,
                    'host' => $host,
                ]);

            $mailer->send($mail);
        }

        return $this->redirectToRoute("success");
    }
}