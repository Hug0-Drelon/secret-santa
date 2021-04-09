<?php

namespace App\Service;

use App\Entity\Event;
use Doctrine\ORM\EntityManagerInterface;

class RandomDraw {

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function runDraw(Event $event)
    {
        $participants = $event->getParticipants();
        $availableParticipants = $participants->toArray();

        foreach ($participants as $participant) {
            $pickedRecipient = $this->getRandomWithException($participant, $availableParticipants);
            $participant->setRecipient($pickedRecipient);

            if (($key = array_search($pickedRecipient, $availableParticipants)) !== false) {
                unset($availableParticipants[$key]);
            }
        }

        $this->em->flush();

        return $participants;
    }

    public function getRandomWithException($exception, $array)
    {
        $pickedElement = $array[array_rand($array)];
        while ($exception === $pickedElement) {
            $pickedElement = $array[array_rand($array)];
        }
        return $pickedElement;
    }
}