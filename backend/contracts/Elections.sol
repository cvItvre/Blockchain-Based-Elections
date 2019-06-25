pragma solidity >=0.4.17 <0.6.0;

contract Elections {

    struct Voter {
        address _id;
        string _email;
        bool _rightToVote;
        bool _isVoted;
        uint256 _vote;
    }

    struct Candidate {
        uint256 _id;
        string _name;
        uint256 _number;
        uint256 _voteCount;
    }

    struct Election {
        uint256 _electionID;
        address _electionAdmin;
        string _electionName;
        string _emailDomain;
        uint256 _openingTime;
        uint256 _closingTime;
        mapping(uint256 => Candidate) _candidates;
        uint256 _candidatesCount;
        mapping(address => Voter) _voters;
        mapping(string => address) _emailToAdress;
        uint256 _votersCount;
    }

    address public contractOwner;
    uint256 public electionCount;
    mapping(uint256 => Election) public elections;

    function Elections() public {
        contractOwner = msg.sender;
        electionCount = 0;
    }

    modifier onlyOwner() {
        require (msg.sender == contractOwner);
        _;
    }

    modifier onlyWhileOpen(uint256 _openingTime, uint256 _closingTime) {
        require (block.timestamp >= _openingTime && block.timestamp < _closingTime);
        _;
    }

    modifier onlyWhenOver(uint256 _closingTime) {
        require (block.timestamp >= _closingTime);
        _;
    }

    modifier condition(bool _condition) {
    	require (_condition);
    	_;
    }

    function getCandidate(uint256 _electionID, uint256 _candidateID)
        public view returnmethods.winner(electionID).call();s(uint256, string memory, uint256, uint256) {

        Candidate memory candidate = elections[_electionID]._candidates[_candidateID];

        return (candidate._id, candidate._name, candidate._number, candidate._voteCount);
    }

    function canVote(
      uint256 _electionID,
      string memory _email)
      public view returns(bool) {
        if (elections[_electionID]._emailToAdress[_email] == 0x0000000000000000000000000000000000000000) {
          return false;
        }

        return true;
      }

    function hasVoted(
      uint256 _electionID,
      string memory _email)
      public view returns(bool) {
        return elections[_electionID]._voters[elections[_electionID]._emailToAdress[_email]]._isVoted;
      }

    function createElection(
      string memory _electionName,
    	string memory _emailDomain,
    	uint256 _openingTime,
    	uint256 _closingTime)
    public onlyOwner{

        electionCount ++;
        elections[electionCount]._electionID = electionCount;
        elections[electionCount]._electionAdmin = contractOwner;
        elections[electionCount]._electionName = _electionName;
        elections[electionCount]._emailDomain = _emailDomain;
        elections[electionCount]._openingTime = _openingTime;
        elections[electionCount]._closingTime = _closingTime;
        elections[electionCount]._candidatesCount = 0;
        elections[electionCount]._votersCount = 0;
    }

    function addCandidates(
    	uint256 _electionID,
    	string memory _candidateName,
    	uint256 _candidateNumber)
    public
    condition(now < elections[_electionID]._openingTime)
    condition(msg.sender == elections[_electionID]._electionAdmin || msg.sender == contractOwner) {

        elections[_electionID]._candidatesCount ++;
        elections[_electionID]._candidates[elections[_electionID]._candidatesCount]._id = elections[_electionID]._candidatesCount;
        elections[_electionID]._candidates[elections[_electionID]._candidatesCount]._name = _candidateName;
        elections[_electionID]._candidates[elections[_electionID]._candidatesCount]._number = _candidateNumber;
        elections[_electionID]._candidates[elections[_electionID]._candidatesCount]._voteCount = 0;

    }

    function giveRightToVote(
        uint256 _electionID,
        string memory _email)
    public {

        require(elections[_electionID]._emailToAdress[_email] == 0x0000000000000000000000000000000000000000);
        elections[_electionID]._votersCount ++;
        elections[_electionID]._emailToAdress[_email] = msg.sender;
        elections[_electionID]._voters[msg.sender]._id = msg.sender;
        elections[_electionID]._voters[msg.sender]._email = _email;
        elections[_electionID]._voters[msg.sender]._rightToVote = true;
        elections[_electionID]._voters[msg.sender]._isVoted = false;

    }

    function vote(
        uint256 _electionID,
        uint256 _candidateID)
    public
    onlyWhileOpen(elections[_electionID]._openingTime, elections[_electionID]._closingTime) {

    	require(elections[_electionID]._voters[msg.sender]._rightToVote == true);
    	require(elections[_electionID]._voters[msg.sender]._isVoted == false);

    	elections[_electionID]._voters[msg.sender]._isVoted = true;
    	elections[_electionID]._voters[msg.sender]._vote = _candidateID;
    	elections[_electionID]._candidates[_candidateID]._voteCount ++;

    }

    function winner(
        uint256 _electionID)
    public
    onlyWhenOver(elections[_electionID]._closingTime)
    view
    returns(string memory) {

        uint256 voteCounts = 0;
        string memory _winnerName;

        for (uint i = 1; i <= elections[_electionID]._candidatesCount; i++) {
            if (elections[_electionID]._candidates[i]._voteCount > voteCounts) {
                _winnerName = elections[_electionID]._candidates[i]._name;
            }
        }

        return _winnerName;

    }


}
