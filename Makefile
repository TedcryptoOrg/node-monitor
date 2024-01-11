-include .env
export $(shell sed 's/=.*//' .env)

SUBDIRS := api monitor ui

.PHONY: $(SUBDIRS) up.api up.ui up.monitor stop.api stop.ui stop.monitor up stop down

$(SUBDIRS):
	$(MAKE) -C $@ $(MAKECMDGOALS)

up.api:
	$(MAKE) -C api up

up.ui:
	$(MAKE) -C ui up

up.monitor:
	$(MAKE) -C monitor up

stop.api:
	$(MAKE) -C api stop

stop.ui:
	$(MAKE) -C ui stop

stop.monitor:
	$(MAKE) -C monitor stop

up stop down: $(SUBDIRS)