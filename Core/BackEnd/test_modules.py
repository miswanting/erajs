class TestEventManager:
    def test_on(self):
        import erajs.Managers.EventManager as Event
        em = Event.EventManager()
        em.once('event_type', self.callback_function)
        em.emit('event_type', 'callback_data')
        assert len(em.get_listener_list()) == 0

    def test_once(self):
        import erajs.Managers.EventManager as Event
        em = Event.EventManager()
        em.on('event_type', self.callback_function)
        em.emit('event_type', 'callback_data')
        assert len(em.get_listener_list()) == 1

    def test_remove_listener(self):
        import erajs.Managers.EventManager as Event
        em = Event.EventManager()
        em.on('event_type', self.callback_function)
        em.remove_listener('event_type', self.callback_function)
        assert len(em.get_listener_list()) == 0

    def test_remove_all_listener(self):
        import erajs.Managers.EventManager as Event
        em = Event.EventManager()
        em.on('event_type1', self.callback_function)
        em.on('event_type2', self.callback_function)
        em.remove_all_listeners()
        assert len(em.get_listener_list()) == 0

    def callback_function(self, data):
        assert data == 'callback_data'
