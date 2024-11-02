IP=18.184.125.50

nmap:
	nmap ${IP}

testssl:
	podman run --rm -ti  drwetter/testssl.sh -S ${IP}:50000

get-disk:
	talosctl get disk -n ${IP} -e ${IP} --insecure

dashboard:
	talosctl dashboard -n ${IP} -e ${IP}

create-config:
	talosctl gen config talos-k8s-aws-tutorial https://${IP}:6443 \
    --with-examples=false \
    --with-docs=false \
    --with-kubespan \
    --install-disk /dev/xvda \
    --config-patch '@time-server-patch.yaml'
	talosctl config endpoints ${IP}
	talosctl config nodes ${IP}

apply:
	talosctl apply-config --insecure -n ${IP} --file controlplane.yaml

bootstrap:
	talosctl bootstrap -n ${IP} -e ${IP}

kubeconfig:
	talosctl kubeconfig -n ${IP} -e ${IP} ./kubeconfig

debug:
	kubectl debug -n kube-system -it --image alpine node/ip-10-0-0-35

services:
	talosctl services -n ${IP} -e ${IP}

logs:
	talosctl logs kubelet -n ${IP} -e ${IP}

dmesg:
	talosctl dmesg -n ${IP} -e ${IP}

netstat:
	talosctl netstat -n ${IP} -e ${IP}

reset:
	talosctl reset -n ${IP} -e ${IP} --reboot