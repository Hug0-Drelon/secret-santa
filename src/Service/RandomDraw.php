<?php

namespace App\Service;

use App\Entity\Event;

class RandomDraw {

    public function runDraw(Event $event)
    {
        $participants = $event->getParticipants();
        
    }
}